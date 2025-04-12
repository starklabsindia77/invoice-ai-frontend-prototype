
const { pgPool } = require('../../../config/database');
const logger = require('../../../utils/logger');
const PublicModel = require('./PublicModel');

class TenantModel extends PublicModel {
  constructor() {
    super('tenants');
  }
  
  async findByName(name) {
    try {
      const result = await pgPool.query(
        `SELECT * FROM ${this.getQualifiedTableName()} WHERE name = $1`,
        [name]
      );
      
      return result.rows.length > 0 ? this.toCamelCase(result.rows[0]) : null;
    } catch (error) {
      logger.error(`Error in findByName: ${error.message}`);
      throw error;
    }
  }
  
  async findByDomain(domain) {
    try {
      const result = await pgPool.query(
        `SELECT * FROM ${this.getQualifiedTableName()} WHERE domain = $1`,
        [domain]
      );
      
      return result.rows.length > 0 ? this.toCamelCase(result.rows[0]) : null;
    } catch (error) {
      logger.error(`Error in findByDomain: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new TenantModel();
