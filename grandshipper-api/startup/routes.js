const express = require('express');
const cors = require('cors');
const types = require('../routes/types');
const blogs = require('../routes/blogs');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');

// Define all routes of the API and error handling middleware.
module.exports = (app) => {
    // Routes.
    app.use(cors({
        origin: ['http://localhost:3001'],
        credentials: true
    }));
    app.use(express.json());
    app.use('/api/types', types);
    app.use('/api/blogs', blogs);
    app.use('/api/users', users);
    app.use('/api/auth', auth);

    // Error handling middleware.
    app.use(error);
};