module.exports.ValidateResult = class ValidateResult {
    constructor(isValid, errorMessage) {
        this.isValid = isValid;
        this.errorMessage = errorMessage;
    }
};