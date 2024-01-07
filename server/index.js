
const express = require('express');
const { Pool } = require('pg');
const app = express();
const PORT = process.env.PORT || 3300;
const JWT = require("./middleware/jwt.js");


const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
});

exports.pool = pool;

const maxRetries = 5;
let retries = 0;

async function connectWithRetry(pool) {
    try {
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
        setTimeout(() => connectWithRetry(pool), 5000); // Wait for 5 seconds before retrying
    }
}

connectWithRetry(pool);

// Body parser middleware
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from Express!');
});

// Import routes here to avoid problems with pool dependency
const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js");

app.use('/auth', authRoutes);

// protected routes below
app.use(JWT);

app.use('/user', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});