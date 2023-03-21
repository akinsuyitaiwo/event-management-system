const request = require('supertest');
const app = require('../../app.js');


describe('GET /', () => {
    test('it should respond with 200', () => {
        return request(app).get('/').then(response => {
            expect(response.statusCode).toBe(200)
        })
    })
})