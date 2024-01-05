const { pool } = require('../index');
const util = require('util');

// Promisify pool.query to use it with async/await
const query = util.promisify(pool.query).bind(pool);

// Checks that a username exists exactly 0 times in the Users table and returns the result
exports.checkUsernameUnique = async (username) => {
  try {
    const result = await query('SELECT * FROM Users WHERE Username = $1', [username]);
    return result.rows.length === 0;
  } catch (error) {
    throw new Error('Error checking username uniqueness: ' + error.message);
  }
};

// Checks that an email exists exactly 0 times in the Users table and returns the result
exports.checkEmailUnique = async (email) => {
  try {
    const result = await query('SELECT * FROM Users WHERE Email = $1', [email]);
    return result.rows.length === 0;
  } catch (error) {
    throw new Error('Error checking email uniqueness: ' + error.message);
  }
};

// Creates a new user and returns the new user's UserID in the callback
exports.createUser = async (email, password, role) => {
  const insertQuery = 'INSERT INTO Users (Email, Password, Role) VALUES ($1, $2, $3) RETURNING UserID';

  try {
    const result = await query(insertQuery, [email, password, role]);
    return result.rows[0].userid;
  } catch (error) {
    throw new Error('Error creating user: ' + error.message);
  }
};
