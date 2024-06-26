const { Blog, validateBlogId, validateBlog} = require('../models/blog');
const { Type } = require('../models/types');
const { ValidateResult } = require('../helpers/validations');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

// Get all blogs.
router.get('/', async (req, res) => {
    try {
        res.send(await Blog.find().sort('title'));
    } catch (err) {
        console.error('Failed to get all blogs.', err);
    }
});

// Create a blog and return it.
router.post('/', auth, async (req, res) => {

    // If invalid blog parameters, return 400 - Bad Request.
    const validateBlogResult = validateRequestBlog(req);
    if (!validateBlogResult.isValid) {
        return res.status(400).send(validateBlogResult.errorMessage);
    }

    // Get the type of the blog by the Id.
    const type = await Type.findById(req.body.typeId);

    // Validate that the type exists on the database, if not, return 400 - Bad Request.
    if (!type) {
        return res.status(400).send(`Type not found (Id: ${req.body.typeId.trim()}) on the database.`);
    }

    // Create a new blog.
    let blog;
    try {
        blog = await new Blog({
            title: req.body.title,
            type: new Type({
                _id: type._id,
                name: type.name
            }),
            content: req.body.content,
            author: req.body.author
        }).save();
    } catch (err) {
        console.error('Failed to create the blog.', err);
    }

    // Validate that the blog was saved on the database, if not, return 400 - Bad Request.
    if (!blog) {
        return res.status(400).send('Failed to save the blog on the database.');
    }

    // Return the new blog.
    return res.send(blog);
});

// Update a blog and return it.
router.put('/:id', async (req, res) => {

    // If invalid blog Id parameter, return 400 - Bad Request.
    const validateIdResult = validateRequestId(req);
    if (!validateIdResult.isValid) {
        return res.status(400).send(validateIdResult.errorMessage);
    }

    // If invalid blog parameters, return 400 - Bad Request.
    const validateBlogResult = validateRequestBlog(req);
    if (!validateBlogResult.isValid) {
        return res.status(400).send(validateBlogResult.errorMessage);
    }

    // Get the type of the blog by the Id.
    const type = await Type.findById(req.body.typeId);

    // Validate that the type exists on the database, if not, return 400 - Bad Request.
    if (!type) {
        return res.status(400).send(`Type not found (Id: ${req.body.typeId.trim()}) on the database.`);
    }

    // Update the existing blog.
    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(req.params.id.trim(), {
            title: req.body.title,
            type: {
                _id: type._id,
                name: type.name
            },
            content: req.body.content,
            author: req.body.author
        }, {
            new: true
        });
    } catch (err) {
        console.error(`Failed to update the blog (Id: ${req.params.id.trim()}).`, err);
    }

    // Validate that the blog was saved on the database, if not, return 400 - Bad Request.
    if (!blog) {
        return res.status(400).send(`Failed to update the blog (Id: ${req.params.id.trim()}) on the database.`);
    }

    // Return the updated blog.
    return res.send(blog);
});

// Delete a blog and return it.
router.delete('/:id', async (req, res) => {

    // If invalid blog Id parameter, return 400 - Bad Request.
    const validateIdResult = validateRequestId(req);
    if (!validateIdResult.isValid) {
        return res.status(400).send(validateIdResult.errorMessage);
    }

    // Delete the blog.
    let blog;
    try {
        blog = await Blog.findByIdAndDelete(req.params.id.trim());
    } catch (err) {
        console.error(`Failed to delete the blog (Id: ${req.params.id.trim()}).`, err);
    }

    // Validate that the blog was deleted from the database, if not, return 400 - Bad Request.
    if (!blog) {
        return res.status(400).send(`Failed to delete the blog (Id: ${req.params.id.trim()}) from the database.`);
    }

    // Return the deleted blog.
    return res.send(blog);
});

// Get a specific blog by Id and return it.
router.get('/:id', async (req, res) => {

    // If invalid blog Id parameter, return 400 - Bad Request.
    const validateIdResult = validateRequestId(req);
    if (!validateIdResult.isValid) {
        return res.status(400).send(validateIdResult.errorMessage);
    }

    // Get the blog by Id.
    let blog;
    try {
        blog = await Blog.findById(req.params.id.trim());
    } catch (err) {
        console.error(`Failed to get the blog (Id: ${req.params.id.trim()}).`, err);
    }

    // Validate the blog from the database, if not exists, return 404 - Not Found.
    if (!blog) {
        return res.status(404).send(`Failed to get the blog (Id: ${req.params.id.trim()}) from the database.`);
    }

    // Return the blog.
    return res.send(blog);
});

// Validate that the request Id is not empty and the request Id parameter.
const validateRequestId = (req) => {
    if (!req) {
        return new ValidateResult(false, 'No request object.');
    }

    // Get final validation result from model validator function.
    return validateBlogId(req.params.id);
};

// Validate that the request body is not empty and the request body parameters.
const validateRequestBlog = (req) => {
    if (!req) {
        return new ValidateResult(false, 'No request object.');
    }

    // Get final validation result from model validator function.
    return validateBlog({
        title: req.body.title,
        typeId: req.body.typeId,
        content: req.body.content,
        author: req.body.author
    });
};

module.exports = router;