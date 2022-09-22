const express = require('express');
// const mongoose = require('mongoose');
const port = process.env.PORT || 4000;
require('dotenv').config();
require('./src/config/init_mongodb');

const jwt = require('jsonwebtoken');
const verifyAccessToken = require('./src/middleware/auth/verifyAccessToken.js');
const SECRET = process.env.ACCESS_TOKEN_SECRET;

const postRoutes = require('./src/routes/posts.js');
const userRoutes = require('./src/routes/users.js');

const app = express();


// middleware
// app.use(verifyAccessToken);
app.use(express.json()); // allows us to access the req.body on POST
// app.use((req, res, next) => {
//     // console.log(`req.path: ${req.path}, req.method: ${req.method}`);
//     // console.log(req.body);
//     next();
// });


app.get('/', (req, res) => {
    console.log("hello");
})

// sign in and validate with jwt token
app.post('/api/login', verifyAccessToken, (req, res) => {
    const username = req.body.username;
    const user = { name: username };
    const accessToken = jwt.sign(user, SECRET);
    res.status(200).json({ accessToken: accessToken });
    console.log(accessToken);
    res.status(200).send('successfully verified access token');
    // next();
});

// routes
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

// connect to database
// mongoose.connect(process.env.MONGO_URI)
//     .then(() => {
//         app.listen(port, () => {
//             console.log(`connected to database and listen on port ${port}`);
//         });
//     })
//     .catch((error) => console.log(error));
