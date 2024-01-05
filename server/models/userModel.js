const { pool } = require('../index');
const util = require('util');

// Promisify pool.query to use it with async/await
const query = util.promisify(pool.query).bind(pool);

// Creates a new user and returns the new user's UserID in the callback
exports.createUser = async (email, password, role) => {
  const insertQuery = 'INSERT INTO Users (Email, Password, Role) VALUES ($1, $2, $3) RETURNING UserID';

  try {
    const result = await query(insertQuery, [email, password, role]);
    return result.rows[0].userid;
  } catch (error) {
    if(error.code === "23505") {
      throw new Error(`${readUniqueError(error.detail)} already in use`);
    }
    throw new Error(error);
  }
};

exports.login = async (email, password) => {
  const insertQuery = 'SELECT UserID FROM Users WHERE Email = $1 AND Password = $2';

  try {
    const result = await query(insertQuery, [email, password]);
    if (result.rows.length > 0) {
      return result.rows[0].userid;
    } else {
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    throw new Error(error);
  }
};

const readUniqueError = (errorDetail) => {
  const duplicate = errorDetail.match(/Key \((\w+)\)=/)[1];
  return duplicate.charAt(0).toUpperCase() + duplicate.slice(1);
}