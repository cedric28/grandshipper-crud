module.exports = () => {
    const jwtPrivateKey = process.env.JWT_PRIVATE_KEY
    if (!jwtPrivateKey) {
        throw new Error('FATAL ERROR: jwtPrivateKey is undefined.');
    }
};