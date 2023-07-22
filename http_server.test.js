const supertest = require('supertest');
const app       = require('./http_server');
const request   = supertest(app);

it('Hello World!', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
});

var server = app.listen(3000, function(){
    console.log("Running on port 3000...");
});

afterAll(() => {
    server.close();
});
