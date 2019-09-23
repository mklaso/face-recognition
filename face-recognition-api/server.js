const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex')

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'password',
        database: 'facerecognition'
    }
});

db.select('*').from('users').then(data => {
    console.log(data);
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {
    users: [
        {
            id: '123',
            name: 'john',
            email: 'johnnybgud1@gmail.com',
            password: 'yeet',
            entries: 0,
            joined: new Date() //creates a date when executed
        },
        {
            id: '124',
            name: 'jenny',
            email: 'jennayy23@gmail.com',
            password: 'yahoo',
            entries: 0,
            joined: new Date()
        },
    ],
    login: [
        {
            id: '987',
            hash: '',
            email: 'johnnybgud1@gmail.com'
        }
    ]
}

app.get("/", (req, res) => {
    res.send(database.users);
})

//sign in
app.post('/signin', (req, res) => {

    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        res.json(database.users[0]);
    } else {
        res.status(400).json('error logging in');
    }
    res.json('signin');
})

//register
app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    const saltRounds = 10;

    db('users')
        .returning('*')
        .insert({
            email: email,
            name: name,
            joined: new Date()
        })
        .then(user => {
            res.json(user[0]);
        })
        .catch(err => res.status(400).json('unable to register, email already exists.'))
    // bcrypt.hash(password, saltRounds).then(function (hash) {
    //     console.log(hash);
    // })
})

//profile/:id
app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    })
    if (!found) {
        res.status(404).json('that user doesn\'t exist');
    }
})

//image (entry points)
app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++
            return res.json(user.entries);
        }
    })
    if (!found) {
        res.status(404).json('that user doesn\'t exist');
    }
})

app.listen(3001, () => {
    //console.log('yeet');
})

