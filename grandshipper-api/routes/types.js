const { Type, validateTypeId, validateType } = require('../models/types');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validateObjectId = require('../middleware/validateObjectId');
const { ValidateResult } = require('../helpers/validations');
const express = require('express');
const router = express.Router();

// Get all types sorted by name ascending.
router.get('/', async (req, res) => {
    return res.send(await Type.find().sort('name'));
});

// Create a type and return it.
router.post('/', auth, async (req, res) => {

    // If invalid type parameters, return 400 - Bad Request.
    const validateTypeResult = validateRequestType(req);
    if (!validateTypeResult.isValid) {
        return res.status(400).send(validateTypeResult.errorMessage);
    }

    // Create a new type.
    let type;
    try {
        type = await new Type({
            name: req.body.name
        }).save();
    } catch (err) {
        console.error('Failed to create the type.', err);
    }

    // Validate type saved on the database, if not, return 400 - Bad Request.
    if (!type) {
        return res.status(400).send('Failed to save the type on the database.');
    }

    // Return the new type.
    return res.send(type);
});

// Update a type and return it.
router.put('/:id', [validateObjectId], async (req, res) => {

    // If invalid type parameters, return 400 - Bad Request.
    const validateTypeResult = validateRequestType(req);
    if (!validateTypeResult.isValid) {
        return res.status(400).send(validateTypeResult.errorMessage);
    }

    // Update the existing type.
    let type;
    try {
        type = await Type.findByIdAndUpdate(req.params.id.trim(), {
            name: req.body.name.trim()
        }, {
            new: true
        });
    } catch (err) {
        console.error(`Failed to update the type (Id: ${req.params.id.trim()}).`, err);
    }

    // Validate that the type was saved on the database, if not, return 400 - Bad Request.
    if (!type) {
        return res.status(400).send(`Failed to update the type (Id: ${req.params.id.trim()}) on the database.`);
    }

    // Return the updated type.
    return res.send(type);
});

// Delete a type and return it.
router.delete('/:id', [auth, admin], async (req, res) => {

    // If invalid type Id parameter, return 400 - Bad Request.
    const validateIdResult = validateRequestId(req);
    if (!validateIdResult.isValid) {
        return res.status(400).send(validateIdResult.errorMessage);
    }

    // Delete the type.
    let type;
    try {
        type = await Type.findByIdAndRemove(req.params.id.trim());
    } catch (err) {
        console.error(`Failed to delete the type (Id: ${req.params.id.trim()}).`, err);
    }

    // Validate that the type was deleted from the database, if not, return 400 - Bad Request.
    if (!type) {
        return res.status(400).send(`Failed to delete the type (Id: ${req.params.id.trim()}) from the database.`);
    }

    // Return the deleted type.
    return res.send(type);
});

// Get a specific type by Id and return it.
router.get('/:id', [validateObjectId], async (req, res) => {

    // Get the type by Id.
    let type;
    try {
        type = await Type.findById(req.params.id.trim());
    } catch (err) {
        console.error(`Failed to get the type (Id: ${req.params.id.trim()}).`, err);
    }

    // Validate the type from the database, if not exists, return 404 - Not Found.
    if (!type) {
        return res.status(404).send(`Failed to get the type (Id: ${req.params.id.trim()}) from the database.`);
    }

    // Return the type.
    return res.send(type);
});

// Validate that the request Id is not empty and the request Id parameter.
const validateRequestId = (req) => {
    if (!req) {
        return new ValidateResult(false, 'No request object.');
    }

    // Get final validation result from model validator function.
    return validateTypeId(req.params.id);
};

// Validate that the request body is not empty and the request body parameters.
const validateRequestType = (req) => {
    if (!req) {
        return new ValidateResult(false, 'No request object.');
    }

    // Get final validation result from model validator function.
    return validateType({
        name: req.body.name
    });
};

module.exports = router;