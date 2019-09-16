const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
app.use(bodyParser.json());

const database = {
    users: [
        {
            id: '123',
            name: 'john',
            email: 'johnnybgud1@gmail.com',
            entries: 0,
            joined: new Date() //creates a date when executed
        },
        {
            id: '124',
            name: 'jenny',
            email: 'jennayy23@gmail.com',
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
    bcrypt.compare(myPlaintextPassword, hash).then(function (res) {
        // res == true
    });
    bcrypt.compare(someOtherPlaintextPassword, hash).then(function (res) {
        // res == false
    });

    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        res.json('success!');
    } else {
        res.status(400).json('user doesn\'t exist.');
    }
    res.json('signin');
})

//register
app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    const saltRounds = 10;

    bcrypt.hash(password, saltRounds).then(function (hash) {
        console.log(hash);
    })

    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })

    res.json(database.users[database.users.length - 1]);
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

app.listen(3000, () => {
    //console.log('yeet');
})

