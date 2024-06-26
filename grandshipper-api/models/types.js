const mongoose = require('mongoose');
const { ValidateResult } = require('../helpers/validations');

const typeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});

// Create a type schema.
const Type = mongoose.model('Type', typeSchema);

// Validate the type Id.
const validateTypeId = (id) => {
    if (!id) {
        return new ValidateResult(false, 'No Id sent.');
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return new ValidateResult(false, `Invalid type Id ${id}.`);
    }
    return new ValidateResult(true, null);
}

// Validate the type parameters.
const validateType = (type) => {
    // Validate name.
    if (!type.name) {
        return new ValidateResult(false, 'Parameter name is required.');
    }

    if (type.name.length < 5 || type.name.length > 50) {
        return new ValidateResult(false, 'Invalid parameter name (Must be at least 6 and maximum 50 characters length).');
    }
    return new ValidateResult(true, null);
};

module.exports = {
    Type,
    typeSchema,
    validateTypeId,
    validateType
};