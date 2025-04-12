
const { getTenantByDomain, setTenant } = require('../utils/tenantContext');
const logger = require('../utils/logger');

/**
 * Middleware to resolve tenant from request
 * This can use different strategies:
 * 1. Subdomain: tenant-name.example.com
 * 2. Header: X-Tenant-ID
 * 3. Path: /api/tenant-name/...
 */
const resolveTenant = async (req, res, next) => {
  try {
    // Skip tenant resolution for public routes
    if (req.path.startsWith('/api/auth/') || 
        req.path.startsWith('/api/public/') || 
        req.path === '/health' ||
        req.path === '/api/tenants') {
      return next();
    }
    
    let tenantInfo = null;
    
    // Strategy 1: Check for tenant in subdomain
    if (req.hostname && req.hostname !== 'localhost' && req.hostname !== '127.0.0.1') {
      const hostParts = req.hostname.split('.');
      if (hostParts.length > 2) {
        const subdomain = hostParts[0];
        tenantInfo = await getTenantByDomain(subdomain);
      }
    }
    
    // Strategy 2: Check for tenant in header
    if (!tenantInfo && req.headers['x-tenant-id']) {
      const tenantName = req.headers['x-tenant-id'];
      tenantInfo = await getTenantByName(tenantName);
    }
    
    // Strategy 3: Check for tenant in URL path
    if (!tenantInfo && req.path.startsWith('/api/')) {
      const pathParts = req.path.split('/');
      if (pathParts.length > 2) {
        const potentialTenant = pathParts[2];
        // Skip if the path is a known API endpoint and not a tenant name
        if (!['users', 'invoices', 'auth', 'public'].includes(potentialTenant)) {
          tenantInfo = await getTenantByName(potentialTenant);
          
          // If tenant is found, modify the URL to remove tenant name
          if (tenantInfo) {
            const newPath = `/api${req.path.substring(pathParts[2].length + 5)}`;
            req.url = newPath;
          }
        }
      }
    }
    
    if (!tenantInfo) {
      return res.status(400).json({
        success: false,
        message: 'Tenant not found or not specified'
      });
    }
    
    // Set tenant context for the request
    req.tenantId = tenantInfo.id;
    req.schemaName = tenantInfo.schema_name;
    
    // Continue with the tenant context set
    setTenant(tenantInfo.id, tenantInfo.schema_name, next);
  } catch (error) {
    logger.error(`Error resolving tenant: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error resolving tenant'
    });
  }
};

module.exports = { resolveTenant };
