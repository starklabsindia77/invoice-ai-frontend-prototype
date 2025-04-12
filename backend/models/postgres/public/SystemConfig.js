
const { pgPool } = require('../../../config/database');
const logger = require('../../../utils/logger');
const PublicModel = require('./PublicModel');

class SystemConfigModel extends PublicModel {
  constructor() {
    super('system_config');
  }
  
  async getSetting(key) {
    try {
      const result = await pgPool.query(
        `SELECT setting_value FROM ${this.getQualifiedTableName()} WHERE setting_key = $1`,
        [key]
      );
      
      return result.rows.length > 0 ? result.rows[0].setting_value : null;
    } catch (error) {
      logger.error(`Error in getSetting: ${error.message}`);
      throw error;
    }
  }
  
  async setSetting(key, value, description = null) {
    try {
      const result = await pgPool.query(
        `
        INSERT INTO ${this.getQualifiedTableName()} (setting_key, setting_value, description)
        VALUES ($1, $2, $3)
        ON CONFLICT (setting_key) 
        DO UPDATE SET setting_value = $2, description = $3
        RETURNING *
        `,
        [key, value, description]
      );
      
      return this.toCamelCase(result.rows[0]);
    } catch (error) {
      logger.error(`Error in setSetting: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new SystemConfigModel();
