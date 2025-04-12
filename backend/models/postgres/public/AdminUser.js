
const { pgPool } = require('../../../config/database');
const logger = require('../../../utils/logger');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const PublicModel = require('./PublicModel');

class AdminUserModel extends PublicModel {
  constructor() {
    super('admin_users');
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
  
  // Create admin user with hashed password
  async create(userData) {
    const client = await pgPool.connect();
    
    try {
      await client.query('BEGIN');
      
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      
      // Replace plaintext password with hashed password
      const userDataWithHashedPassword = {
        ...userData,
        password: hashedPassword
      };
      
      const snakeCaseData = this.toSnakeCase(userDataWithHashedPassword);
      const fields = Object.keys(snakeCaseData);
      const placeholders = fields.map((_, index) => `$${index + 1}`).join(', ');
      const values = Object.values(snakeCaseData);
      
      const query = `
        INSERT INTO ${this.getQualifiedTableName()} (${fields.join(', ')})
        VALUES (${placeholders})
        RETURNING *
      `;
      
      const result = await client.query(query, values);
      
      await client.query('COMMIT');
      
      const user = this.toCamelCase(result.rows[0]);
      delete user.password;
      
      return user;
    } catch (error) {
      await client.query('ROLLBACK');
      logger.error(`Error creating admin user: ${error.message}`);
      throw error;
    } finally {
      client.release();
    }
  }
  
  // Match password
  async matchPassword(userId, enteredPassword) {
    try {
      const result = await pgPool.query(
        `SELECT password FROM ${this.getQualifiedTableName()} WHERE id = $1`,
        [userId]
      );
      
      if (result.rows.length === 0) {
        return false;
      }
      
      return await bcrypt.compare(enteredPassword, result.rows[0].password);
    } catch (error) {
      logger.error(`Error in matchPassword: ${error.message}`);
      throw error;
    }
  }
  
  // Get signed JWT token
  getSignedJwtToken(userId) {
    return jwt.sign({ id: userId, isAdmin: true }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }
}

module.exports = new AdminUserModel();
