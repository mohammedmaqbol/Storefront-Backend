import supertest from 'supertest';
import app from '../index';
const request = supertest(app);

describe('Test First Endpoint Server', () => {
        it('GET / Endpoint', async () => {
                const Response = await request.get('/');
                expect(Response.status).toBe(200)
        });
});
