// Import express
const express = require('express');
const path = require('path');

// Create an express application
const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Route to handle the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

// Set the port for the server
const PORT = process.env.PORT || 8000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
