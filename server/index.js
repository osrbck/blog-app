const express = require('express');
const cors = require('cors');
const { connect } = require('mongoose');
require('dotenv').config();
const upload = require('express-fileupload');

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// Middleware for JSON and URL-encoded data
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// CORS setup
app.use(cors({
    origin: process.env.CLIENT_URL, // Allow the client URL from environment variables
    credentials: true, // Allow credentials if needed
}));

// File upload middleware
app.use(upload());
app.use('/uploads', express.static(__dirname + '/uploads')); // Serve static files from 'uploads' directory

// API routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Connect to MongoDB and start the server
connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server started on port ${process.env.PORT || 5000}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
