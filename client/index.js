const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('<h1>Whats up homies</h1>');
});

app.listen(PORT, () => {
    console.log(`Client service running on http://localhost:${PORT}`);
});
