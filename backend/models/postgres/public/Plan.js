
const { pgPool } = require('../../../config/database');
const logger = require('../../../utils/logger');
const PublicModel = require('./PublicModel');

class PlanModel extends PublicModel {
  constructor() {
    super('plans');
  }
  
  async getActivePlans() {
    try {
      const result = await pgPool.query(
        `SELECT * FROM ${this.getQualifiedTableName()} WHERE is_active = true ORDER BY price ASC`
      );
      
      return result.rows.map(row => this.toCamelCase(row));
    } catch (error) {
      logger.error(`Error in getActivePlans: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new PlanModel();
