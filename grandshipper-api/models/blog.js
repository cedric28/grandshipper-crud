const mongoose = require('mongoose');
const { ValidateResult } = require('../helpers/validations');
const { typeSchema } = require('./types');

// Create a blog schema.
const Blog = mongoose.model('blog', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        trim: true
    },
    type: {
        type: typeSchema,
        require: true
    },
    content: { 
        type: String, 
        required: true, 
        minlength: 5, 
        maxlength: 255 
    },
    author: { 
        type: String, 
        required: true , 
        minlength: 5, 
        maxlength: 50
    },
}));

// Validate the blog Id.
const validateBlogId = (id) => {
    if (!id) {
        return new ValidateResult(false, 'No Id sent.');
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return new ValidateResult(false, `Invalid blog Id ${id}.`);
    }

    return new ValidateResult(true, null);
}

// Validate the blog parameters.
const validateBlog = (blog) => {
    // Validate typeId.
    if (!blog.typeId) {
        return new ValidateResult(false, 'Parameter typeId is required.');
    }

    if (!mongoose.Types.ObjectId.isValid(blog.typeId)) {
        return new ValidateResult(false, `Invalid type Id ${blog.typeId}.`);
    }

    // Validate title.
    if (!blog.title) {
        return new ValidateResult(false, 'Parameter title is required.');
    }

    if (blog.title.length < 5 || blog.title.length > 255) {
        return new ValidateResult(false, 'Invalid parameter title (Must be at least 5 and maximum 255 characters length).');
    }

    // Validate content.
    if (!blog.content) {
        return new ValidateResult(false, 'Parameter content is required.');
    }

    if (blog.content.length < 5 || blog.content.length > 255) {
        return new ValidateResult(false, 'Invalid parameter content (Must be at least 5 and maximum 255 characters length).');
    }

    if (!blog.author) {
        return new ValidateResult(false, 'Parameter author is required.');
    }

    if (blog.author.length < 5 || blog.author.length > 50) {
        return new ValidateResult(false, 'Invalid parameter author (Must be at least 5 and maximum 50 characters length).');
    }

    return new ValidateResult(true, null);
};

module.exports = {
    Blog,
    validateBlogId,
    validateBlog
};