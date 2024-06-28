const request = require('supertest');
const moment = require('moment');
const mongoose = require('mongoose');
const { Type } = require('../../models/types');
const { Blog } = require('../../models/blog');
const { User } = require('../../models/user');

let server;

// Integration tests for types.
describe('/api/types', () => {
    // Create the server before each test.
    beforeEach(() => {
        server = require('../../index');
    });

    // Close the server after each test.
    afterEach(async () => {
        if (server) {
            await server.close();
        }

        // Remove fake types.
        await Type.remove({});
    });

    describe('GET /', () => {
        it('should return all types.', async () => {
            // Insert fake types.
            await Type.insertMany([
                { name: 'type1' },
                { name: 'type2' }
            ]);

            // Get response from the API.
            const res = await request(server).get('/api/types');

            // Check status code.
            expect(res.status).toBe(200);

            // Check array length.
            expect(res.body.length).toBe(2);

            // Check for the specific inserted documents.
            expect(res.body.some((g) => {
                return g.name === 'type1';
            })).toBeTruthy();
            expect(res.body.some((g) => {
                return g.name === 'type2';
            })).toBeTruthy();
        });
    });

    describe('GET /:id', () => {
        it('should return a specific type by a given Id.', async () => {
            // Insert fake type.
            const type = await new Type({
                name: 'type1'
            }).save();

            // Get response from the API.
            const res = await request(server).get('/api/types/' + type._id);

            // Check status code.
            expect(res.status).toBe(200);

            // Check match objects.
            expect(res.body).toMatchObject({ _id: type._id.toString(), name: 'type1' });

            // Check specific property for extra security.
            expect(res.body).toHaveProperty('name', type.name);
        });

        it('should return 404 type by a given Id that does not exist in the database.', async () => {
            // Insert fake type.
            const type = await new Type({
                name: 'type1'
            }).save();

            // Remove the type from the database so that we can generate 404.
            await Type.findByIdAndDelete(type._id);

            // Get response from the API.
            const res = await request(server).get('/api/types/' + type1._id);

            // Check status code.
            expect(res.status).toBe(404);
        });

        it('should return 400 type1 by a given Id that is not valid.', async () => {
            // Get response from the API.
            const res = await request(server).get('/api/types/2');

            // Check status code.
            expect(res.status).toBe(400);
        });
    });

    describe('POST /', () => {
        // Define the happy path, and then in each test we change
        // one parameter that clearly aligns with the name of the
        // test.
        let token;
        let name;
        const execute = async () => {
            // Call the API to create a new type.
            return await request(server)
                .post('/api/types')
                .set('Authorization', `Bearer ${token}`)
                .send({ name: name });
        };

        // Generate user token and parameter name before each test.
        beforeEach(() => {
            token = new User().generateAuthToken();
            name = 'type1';
        });

        it('should return 401 if the client is not logged in', async () => {
            // Set the token to be empty.
            token = '';

            // Call the API to create a new type.
            const res = await execute();

            // Check status code.
            expect(res.status).toBe(401);
        });

        it('should return 400 if the client has not provided parameter name.', async () => {
            // Set the name to be empty.
            name = '';

            // Call the API to create a new type.
            const res = await execute();

            // Check status code.
            expect(res.status).toBe(400);
        });

        it('should return 400 if the client has not provided a name parameter that is less than 5 characters length', async () => {
            // Set the type name to be less than 5 characters length.
            name = 'type';

            // Call the API to create a new type.
            const res = await execute();

            // Check status code.
            expect(res.status).toBe(400);
        });

        it('should return 400 if the client has not provided a name parameter that is more than 50 characters length', async () => {
            // Set the type name to be more than 50 characters length.
            name = new Array(52).join('a');

            // Call the API to create a new type.
            const res = await execute();

            // Check status code.
            expect(res.status).toBe(400);
        });

        it('should save the type on the database.', async () => {
            // Call the API to create a new type.
            const res = await execute();

            // Get the type from the database.
            const type = await Type.findOne({ name: name });

            // Check status code.
            expect(res.status).toBe(200);

            // Check that type exists.
            expect(type).not.toBeNull();
        });

        it('should return 200 with the new type.', async () => {
            // Call the API to create a new type.
            const res = await execute();

            // Check status code.
            expect(res.status).toBe(200);

            // Check for Id and name properties.
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', 'type1');
        });
    });
});

// Integration tests for auth middleware.
describe('auth middleware', () => {
    // Create the server before each test.
    beforeEach(() => {
        server = require('../../index');
    });

    // Close the server after each test.
    afterEach(async () => {
        if (server) {
            await server.close();
        }

        // Remove fake types.
        await Type.remove({});
    });

    let token;
    let tokenKey;
    const execute = () => {
        return request(server)
            .post('/api/types')
            .set(tokenKey, `Bearer ${token}`)
            .send({ name: 'type1' });
    };

    // Generate user token before each test.
    beforeEach(() => {
        token = new User().generateAuthToken();
        tokenKey = 'Authorization';
    });

    it('should return 401 if no token was provided.', async () => {
        // Set the token to be empty.
        token = '';

        // Call the API.
        const res = await execute();

        // Check the status code.
        expect(res.status).toBe(401);
    });

    it('should return 401 if an empty space token was provided.', async () => {
        // Set the token to be empty space.
        token = ' ';

        // Call the API.
        const res = await execute();

        // Check the status code.
        expect(res.status).toBe(401);
    });

    it('should return 401 if an invalid (undefined) token was provided.', async () => {
        // Set the token key to invalid.
        tokenKey = 'Authorization';

        // Call the API.
        const res = await execute();

        // Check the status code.
        expect(res.status).toBe(401);
    });

    it('should return 400 if an invalid (null) token was provided.', async () => {
        // Set the token to be null.
        token = null;

        // Call the API.
        const res = await execute();

        // Check the status code.
        expect(res.status).toBe(400);
    });

    it('should return 400 if an invalid token was provided.', async () => {
        // Set the token to be invalid.
        token = 'a';

        // Call the API.
        const res = await execute();

        // Check the status code.
        expect(res.status).toBe(400);
    });

    it('should return 200 and user payload if a valid token was provided.', async () => {
        // Call the API.
        const res = await execute();

        // Check the status code.
        expect(res.status).toBe(200);
    });
});