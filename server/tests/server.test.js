const app = require('../server/');
const testServer = require('supertest');


describe('test root path', () => {
    test('it should respond 201 to the LOGOUT route', async () => {
        const response = await testServer(app).put('/api/spotify/update-current-playlist')
        expect(response.statusCode).toBe(201);
    })
})