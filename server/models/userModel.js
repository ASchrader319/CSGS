const { pool } = require('../index');
const util = require('util');

// Promisify pool.query to use it with async/await
const queryDB = util.promisify(pool.query).bind(pool);

// Creates a new user and returns the new user's UserID and Role
exports.createUser = async (email, password, role) => {
  const query = 'INSERT INTO Users (Email, Password, Role) VALUES ($1, $2, $3) RETURNING UserID, Role';

  try {
    const result = await queryDB(query, [email, password, role]);
    return result.rows[0];
  } catch (error) {
    if(error.code === "23505") {
      throw new Error(`${readUniqueError(error.detail)} already in use`);
    }
    throw new Error(error);
  }
};

// Logs in an existing user and returns the user's UserID and Role
exports.login = async (email, password) => {
  const query = 'SELECT UserID, Role FROM Users WHERE Email = $1 AND Password = $2';

  try {
    const result = await queryDB(query, [email, password]);
    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    throw new Error(error);
  }
};

// Does a lookup by UserID and returns all user information
exports.lookupById = async (userId) => {
  const query = 'SELECT Email, Role FROM Users WHERE UserID = $1';

  try {
    const result = await queryDB(query, [userId]);
    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    throw new Error(error);
  }
}

const readUniqueError = (errorDetail) => {
  const duplicate = errorDetail.match(/Key \((\w+)\)=/)[1];
  return duplicate.charAt(0).toUpperCase() + duplicate.slice(1);
}