const jwt = require('jsonwebtoken');
const { User } = require('../../../models/user');
const mongoose = require('mongoose');

describe('user.generateAuthToken', () => {
    it('should return a valid user authentication token.', () => {
        const payload = {
            _id: new mongoose.Types.ObjectId().toHexString(),
            isAdmin: true
        };
        const user = new User(payload);
        const userToken = user.generateAuthToken();
        const decodedPayload = jwt.verify(userToken, process.env.JWT_PRIVATE_KEY);
        expect(decodedPayload).toMatchObject(payload);
    });
});