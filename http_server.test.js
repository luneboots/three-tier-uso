const supertest = require('supertest');
const app       = require('./http_server');
const request   = supertest(app);
const faker     = require('faker');

function add(){
    // setup
    const firstName     = faker.name.firstName();
    const lastName      = faker.name.lastName();
    const date          = faker.date.past(50, new Date("Sat Sep 20 1992 21:35:02 GMT+0200 (CEST)"));

    // random data
    const name          = faker.name.findName(firstName, lastName);
    const email         = faker.internet.email(firstName, lastName);
    const username      = faker.internet.userName(firstName, lastName);
    const password      = faker.internet.password();
    const phone         = faker.phone.phoneNumber();
    const streetaddress = faker.address.streetAddress();
    const citystatezip  = faker.address.city() 
                            + ", " + faker.address.stateAbbr() + " " 
                            + faker.address.zipCode();
    const latitude      = faker.address.latitude();
    const longitude     = faker.address.longitude();
    const dob           = date.getFullYear() + "-" 
                            + (date.getMonth()+1) + "-" 
                            + date.getDate();  

    // write value to console
    // -------------------------
    console.log(firstName);
    console.log(lastName);
    console.log(date);

    console.log(name);
    console.log(dob);    
    console.log(email);
    console.log(username);
    console.log(password);
    console.log(phone);
    console.log(streetaddress);
    console.log(citystatezip);
    console.log(latitude);
    console.log(longitude);        

    // user object
    const user = {
        name,
        dob,
        email,
        username,
        password,
        phone,
        streetaddress,
        citystatezip,
        latitude,
        longitude,
    }
    return {
        name,
        dob,
        email,
        username,
        password,
        phone,
        streetaddress,
        citystatezip,
        latitude,
        longitude,
    };
}
//create test users
const user1 = add();
const user2 = add();
const user3 = add();

it('populate data', async () => {
    await new Promise((resolve) => {
        request.post('/add')
            .send(user1)
            .end(() => resolve());
    });
    await new Promise((resolve) => {
        request.post('/add')
            .send(user2)
            .end(() => resolve());
    });
    await new Promise((resolve) => {
        request.post('/add')
            .send(user3)
            .end(() => resolve());
    });
});

it('verify data', async () => {
    const data = await request.get('/data');
    expect(data.body.some(e => e.name === user1.name)).toBeTruthy();
    expect(data.body.some(e => e.name === user2.name)).toBeTruthy();
    expect(data.body.some(e => e.name === user3.name)).toBeTruthy();
})

var server = app.listen(3000, function(){
    console.log("Running on port 3000...");
});

afterAll(done => {
    server.close();
    done();
});
