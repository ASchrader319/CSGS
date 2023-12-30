console.log("PostgreSQL Connection Environment Variables:");
console.log("POSTGRES_USER:", process.env.POSTGRES_USER);
console.log("POSTGRES_HOST:", process.env.POSTGRES_HOST);
console.log("POSTGRES_DB:", process.env.POSTGRES_DB);
console.log("POSTGRES_PASSWORD:", "[HIDDEN]"); // Hiding the password for security
console.log("POSTGRES_PORT:", process.env.POSTGRES_PORT);

const express = require('express');
const { Pool } = require('pg');
const app = express();
const PORT = process.env.PORT || 3300;


const maxRetries = 5;
let retries = 0;

async function connectWithRetry() {
try {
    const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
    });
    await pool.query('SELECT 1'); // Simple query to check the connection
    console.log('Successfully connected to the database');
} catch (err) {
    console.error('Failed to connect to the database:', err);
    retries += 1;
    if (retries > maxRetries) {
    console.error('Max retries reached, exiting');
    process.exit(1);
    }
    console.log(`Retrying to connect (Attempt: ${retries})...`);
    setTimeout(connectWithRetry, 5000); // Wait for 5 seconds before retrying
}
}

connectWithRetry();

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
    });

app.get('/', (req, res) => {
    res.send('Hello from Express!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = pool;