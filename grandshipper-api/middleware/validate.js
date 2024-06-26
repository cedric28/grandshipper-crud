// Create dynamic validator middleware - Validate the request in each route.
module.exports = (validator) => {
    return (req, res, next) => {
        // If invalid parameters, return 400 - Bad Request.
        const validateResult = validator(req);
        if (!validateResult.isValid) {
            return res.status(400).send(validateResult.errorMessage);
        }

        if (next) {
            next();
        }
    };
};