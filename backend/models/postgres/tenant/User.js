
const { pgPool } = require('../../../config/database');
const logger = require('../../../utils/logger');
const PostgresModel = require('./PostgresModel');

class UserModel extends PostgresModel {
  constructor() {
    super('users');
  }
  
  async findByEmail(email) {
    try {
      const result = await pgPool.query(
        `SELECT * FROM ${this.getQualifiedTableName()} WHERE email = $1`,
        [email]
      );
      
      return result.rows.length > 0 ? this.toCamelCase(result.rows[0]) : null;
    } catch (error) {
      logger.error(`Error in findByEmail: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new UserModel();
