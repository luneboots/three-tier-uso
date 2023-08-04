const express = require('express');
const app     = express();
const low     = require('lowdb');
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync('db.json');
const db      = low(adapter);
const cors    = require('cors');
const { faker } = require('@faker-js/faker');
require('dotenv').config();
const port = process.env.PORT || 3000;


// allow cross-origin resource sharing (CORS)
app.use(cors());

// data parser - used to parse post data
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// serve static files from public directory
// -------------------------------------------
app.use(express.static('public'));

// init the data store
db.defaults({ users: []}).write();

// return all users
app.get('/data', function(req, res){     
    res.send(db.get('users').value());
});

// add user
app.post('/add', function(req, res){
    var user = {
        'name'          : req.body.name,
        'dob'           : req.body.dob,
        'email'         : req.body.email,
        'username'      : req.body.username,
        'password'      : req.body.password,
        'phone'         : req.body.phone,
        'streetaddress' : req.body.streetaddress,
        'citystatezip'  : req.body.citystatezip,
        'latitude'      : req.body.latitude,
        'longitude'     : req.body.longitude,
        'avatar'        : faker.internet.avatar() 
    }
    db.get('users').push(user).write();
    console.log(db.get('users').value());
    res.send(db.get('users').value());
});

app.get("/search", (req, res) => {
    const searchQuery = req.query.query.toLowerCase().trim();

    console.log("Received Search Query:", searchQuery);

    const results = db.get("users").filter(user => {
        const fullName = user.name.toLowerCase();
        console.log(`Comparing "${searchQuery}" with "${fullName}"`);
        return fullName.includes(searchQuery);
    }).value();

    console.log("Search Results:", results);

    res.json(results);
});

// start server
// -----------------------
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
  });
  