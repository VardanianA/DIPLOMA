require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const app = express();
const session = require('express-session');
const path = require("path");
const bodyParser = require("body-parser");
const cinema_router = require('./routers/cinema_routers');
const cafe_router = require('./routers/cafe_routers');
const restaurant_router = require('./routers/restaurant_routers');
const club_router = require('./routers/club_routers');
const pub_router = require('./routers/pub_routers');
const party_router = require('./routers/party_routers');
const opera_router = require('./routers/opera_routers');
const theatre_router = require('./routers/theatre_routers');

//middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, '/build')));
app.use(express.json());


app.use(express.static(path.join(__dirname, 'build/static/media/')))
app.use(
    session({
        sesName: 'ani',
        secret: 'my secret key',
        saveUninitialized: true,
        resave: false
    })
)

app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message
    next();
})

mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log(("Connected to the db")));


//set templete engine
app.set('view engine', 'ejs');

app.get('/login',(req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'Login.html'));
})

app.get('/login/admin', (req, res) =>{
    res.sendFile(path.join(__dirname, 'views/Admin.html'));
})



//router prefix
app.use("", require("./routers/routers"))
app.use('/cinemas', cinema_router);
app.use('/caves', cafe_router);
app.use('/restaurants', restaurant_router);
app.use('/clubs', club_router);
app.use('/pubs', pub_router);
app.use('/partys', party_router);
app.use('/operas', opera_router);
app.use('/theatres', theatre_router);




app.listen(3001, () => {
    console.log(`Server started at http://localhost:${3001}`);
})



