const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const validator = require("email-validator");
const connectionString = "mongodb://localhost:27017";
const client = require("mongodb").MongoClient;
const path = require("path");
const Cinema = require('../models/cinemas');
const Cafe = require('../models/cafes');
const Restaurant = require('../models/restaurants');
const Club = require('../models/clubs');
const Pub = require('../models/pubs');
const Party = require('../models/partys');
const Opera = require('../models/operas');
const Theatre = require('../models/theatres');
const multer = require('multer');
const { unlinkSync } = require('fs');

router.post('/stars', (req, res) => {
    (async () => {
        let connection = await client.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        let db = connection.db("venuedb");

        db.collection('rating').insertMany([{ mail: req.body.mail, star: req.body.star, cinema: req.body.cinema }], function (err, user) {
            if (err) {
                return res.status(500).send({ msg: err.message });
            }
            // user is not found in database i.e. user is not registered yet.
            else if (!user) {
                return res.status(401).send('The email address ' + req.body.mail + ` is not associated with any account. please check and try again!`);
            }


            else
                // hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null);

                // if (!bcrypt.compareSync(req.body.password, user.password)) {
                //     return res.status(401).send(`Wrong Password!`);
                // }
                // check user is verified or not

                // mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                verified = validator.validate(req.body.mail);
            if (!verified) {
                return res.status(401).send('Your Email has not been verified. Please click on resend');
            }
            // user successfully logged in
            else {
                res.redirect('/');
                // res.json({cinemas: cinemas})
            }
            //   })
            // }
        })

    })().catch((error) => console.log(error));
})

router.post('/login', (req, res) => {
    (async () => {
        let connection = await client.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        let db = connection.db("venuedb");

        db.collection("login").findOne({ email: req.body.email }, function (err, user) {
            // error occur
            if (err) {
                return res.status(500).send({ msg: err.message });
            }
            // user is not found in database i.e. user is not registered yet.
            else if (!user) {
                return res.status(401).send('The email address ' + req.body.email + ` is not associated with any account. please check and try again! <a href="/login">Login</a>`);
            }


            else
                // hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null);

                if (!bcrypt.compareSync(req.body.password, user.password)) {
                    return res.status(401).send(`Wrong Password! <a href="/login">Login</a>`);
                }
                // check user is verified or not
                else
                    // mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                    verified = validator.validate(req.body.email);
            if (!verified) {
                return res.status(401).send('Your Email has not been verified. Please click on resend');
            }
            // user successfully logged in
            else {
                return res.redirect(`../login/admin`);
            }
            // {
            //     req.session.user = user;
            //     res.redirect('../login/admin')
            //     // return res.redirect('../login/admin')
            // }
        });
    })().catch((error) => console.log(error));
})

router.get('/logout', (req, res) => {
    res.redirect('login')
})

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './build/static/media/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('image');

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|jfif|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb("Error: Image Only");
    }
}


//insert

//cinema
router.post('/login/admin/addCinema/add', upload, (req, res) => {
    const cinema = new Cinema({
        title: req.body.title,
        image: req.file.filename,
        description: req.body.description
    });
    cinema.save((err) => {
        if (err) {
            res.json({ message: err.message, type: 'danger' })
        } else {
            req.session.message = {
                type: 'success',
                message: "Cinema added successfuly"
            };
            res.redirect('/login/admin/addCinema');
        }
    })
})

//cafe
router.post('/login/admin/addCafe/add', upload, (req, res) => {
    const cafe = new Cafe({
        title: req.body.title,
        image: req.file.filename,
        description: req.body.description
    });
    cafe.save((err) => {
        if (err) {
            res.json({ message: err.message, type: 'danger' })
        } else {
            req.session.message = {
                type: 'success',
                message: "Cafe added successfuly"
            };
            res.redirect('/login/admin/addCafe');
        }
    })
})

//restaurant
router.post('/login/admin/addRestaurant/add', upload, (req, res) => {
    const restaurant = new Restaurant({
        title: req.body.title,
        image: req.file.filename,
        description: req.body.description
    });
    restaurant.save((err) => {
        if (err) {
            res.json({ message: err.message, type: 'danger' })
        } else {
            req.session.message = {
                type: 'success',
                message: "Restaurant added successfuly"
            };
            res.redirect('/login/admin/addRestaurant');
        }
    })
})

//club
router.post('/login/admin/addClub/add', upload, (req, res) => {
    const club = new Club({
        title: req.body.title,
        image: req.file.filename,
        description: req.body.description
    });
    club.save((err) => {
        if (err) {
            res.json({ message: err.message, type: 'danger' })
        } else {
            req.session.message = {
                type: 'success',
                message: "Club added successfuly"
            };
            res.redirect('/login/admin/addClub');
        }
    })
})

//pub
router.post('/login/admin/addPub/add', upload, (req, res) => {
    const pub = new Pub({
        title: req.body.title,
        image: req.file.filename,
        description: req.body.description
    });
    pub.save((err) => {
        if (err) {
            res.json({ message: err.message, type: 'danger' })
        } else {
            req.session.message = {
                type: 'success',
                message: "Pub added successfuly"
            };
            res.redirect('/login/admin/addPub');
        }
    })
})

//party
router.post('/login/admin/addParty/add', upload, (req, res) => {
    const party = new Party({
        title: req.body.title,
        image: req.file.filename,
        description: req.body.description
    });
    party.save((err) => {
        if (err) {
            res.json({ message: err.message, type: 'danger' })
        } else {
            req.session.message = {
                type: 'success',
                message: "Party added successfuly"
            };
            res.redirect('/login/admin/addParty');
        }
    })
})

//opera
router.post('/login/admin/addOpera/add', upload, (req, res) => {
    const opera = new Opera({
        title: req.body.title,
        image: req.file.filename,
        description: req.body.description
    });
    opera.save((err) => {
        if (err) {
            res.json({ message: err.message, type: 'danger' })
        } else {
            req.session.message = {
                type: 'success',
                message: "Opera added successfuly"
            };
            res.redirect('/login/admin/addOpera');
        }
    })
})

//theatre
router.post('/login/admin/addTheatre/add', upload, (req, res) => {
    const theatre = new Theatre({
        title: req.body.title,
        image: req.file.filename,
        description: req.body.description
    });
    theatre.save((err) => {
        if (err) {
            res.json({ message: err.message, type: 'danger' })
        } else {
            req.session.message = {
                type: 'success',
                message: "Theatre added successfuly"
            };
            res.redirect('/login/admin/addTheatre');
        }
    })
})



//get all cinemas route

//cinema
router.get('/login/admin/addCinema', (req, res) => {
    Cinema.find().exec((err, cinemas) => {
        if (err) {
            res.json({ message: err.message });
        } else {

            res.render('cinema',
                {
                    titles: "Home Page",
                    cinemas: cinemas
                })
        }
    })

})

//cafe
router.get('/login/admin/addCafe', (req, res) => {
    Cafe.find().exec((err, cafes) => {
        if (err) {
            res.json({ message: err.message });
        } else {
            res.render('cafe', {
                titles: "Home Page",
                cafes: cafes
            })
        }
    })
})

//restaurant
router.get('/login/admin/addRestaurant', (req, res) => {
    Restaurant.find().exec((err, restaurants) => {
        if (err) {
            res.json({ message: err.message });
        } else {
            res.render('restaurant', {
                titles: "Home Page",
                restaurants: restaurants
            })
        }
    })
})


//club
router.get('/login/admin/addClub', (req, res) => {
    Club.find().exec((err, clubs) => {
        if (err) {
            res.json({ message: err.message });
        } else {
            res.render('club', {
                titles: "Home Page",
                clubs: clubs
            })
        }
    })
})


//pub
router.get('/login/admin/addPub', (req, res) => {
    Pub.find().exec((err, pubs) => {
        if (err) {
            res.json({ message: err.message });
        } else {
            res.render('pub', {
                titles: "Home Page",
                pubs: pubs
            })
        }
    })
})


//party
router.get('/login/admin/addParty', (req, res) => {
    Party.find().exec((err, partys) => {
        if (err) {
            res.json({ message: err.message });
        } else {
            res.render('party', {
                titles: "Home Page",
                partys: partys
            })
        }
    })
})


//opera
router.get('/login/admin/addOpera', (req, res) => {
    Opera.find().exec((err, operas) => {
        if (err) {
            res.json({ message: err.message });
        } else {
            res.render('opera', {
                titles: "Home Page",
                operas: operas
            })
        }
    })
})


//theatre
router.get('/login/admin/addTheatre', (req, res) => {
    Theatre.find().exec((err, theatres) => {
        if (err) {
            res.json({ message: err.message });
        } else {
            res.render('theatre', {
                titles: "Home Page",
                theatres: theatres
            })
        }
    })
})

//cinema
router.get('/login/admin/addCinema/add', (req, res) => {
    res.render('addCinema', { titles: "Add Cinemas" })
})

//cafe
router.get('/login/admin/addCafe/add', (req, res) => {
    res.render('addCafe', { titles: "Add Cafe" })
})

//restaurant
router.get('/login/admin/addRestaurant/add', (req, res) => {
    res.render('addRestaurant', { titles: "Add Restaurant" })
})
//club
router.get('/login/admin/addClub/add', (req, res) => {
    res.render('addClub', { titles: "Add Club" })
})
//pub
router.get('/login/admin/addPub/add', (req, res) => {
    res.render('addPub', { titles: "Add Pub" })
})
//party
router.get('/login/admin/addParty/add', (req, res) => {
    res.render('addParty', { titles: "Add Party" })
})
//opera
router.get('/login/admin/addOpera/add', (req, res) => {
    res.render('addOpera', { titles: "Add Opera" })
})
//theatre
router.get('/login/admin/addTheatre/add', (req, res) => {
    res.render('addTheatre', { titles: "Add Theatre" })
})

//edit

//cinema
router.get('/login/admin/addCinema/edit/:id', (req, res) => {
    let id = req.params.id;
    Cinema.findById(id, (err, cinema) => {
        if (err) {
            res.redirect('/login/admin/addCinema');
        } else {
            if (cinema == null) {
                res.redirect('/login/admin/addCinema');
            } else {
                res.render('edit_cinema', {
                    titles: 'Edit Cinema',
                    cinema: cinema,
                })
            }
        }
    })
})

//cafe
router.get('/login/admin/addCafe/edit/:id', (req, res) => {
    let id = req.params.id;
    Cafe.findById(id, (err, cafe) => {
        if (err) {
            res.redirect('/login/admin/addCafe');
        } else {
            if (cafe == null) {
                res.redirect('/login/admin/addCafe');
            } else {
                res.render('edit_cafe', {
                    titles: 'Edit Cafe',
                    cafe: cafe,
                })
            }
        }
    })
})

//restaurant
router.get('/login/admin/addRestaurant/edit/:id', (req, res) => {
    let id = req.params.id;
    Restaurant.findById(id, (err, restaurant) => {
        if (err) {
            res.redirect('/login/admin/addRestaurant');
        } else {
            if (restaurant == null) {
                res.redirect('/login/admin/addRestaurant');
            } else {
                res.render('edit_restaurant', {
                    titles: 'Edit Restaurant',
                    restaurant: restaurant,
                })
            }
        }
    })
})

//club
router.get('/login/admin/addClub/edit/:id', (req, res) => {
    let id = req.params.id;
    Club.findById(id, (err, club) => {
        if (err) {
            res.redirect('/login/admin/addClub');
        } else {
            if (club == null) {
                res.redirect('/login/admin/addClub');
            } else {
                res.render('edit_club', {
                    titles: 'Edit Club',
                    club: club,
                })
            }
        }
    })
})

//pub
router.get('/login/admin/addPub/edit/:id', (req, res) => {
    let id = req.params.id;
    Pub.findById(id, (err, pub) => {
        if (err) {
            res.redirect('/login/admin/addPub');
        } else {
            if (pub == null) {
                res.redirect('/login/admin/addPub');
            } else {
                res.render('edit_pub', {
                    titles: 'Edit Pub',
                    pub: pub,
                })
            }
        }
    })
})

//party
router.get('/login/admin/addParty/edit/:id', (req, res) => {
    let id = req.params.id;
    Party.findById(id, (err, party) => {
        if (err) {
            res.redirect('/login/admin/addParty');
        } else {
            if (party == null) {
                res.redirect('/login/admin/addParty');
            } else {
                res.render('edit_party', {
                    titles: 'Edit Party',
                    party: party,
                })
            }
        }
    })
})

//opera
router.get('/login/admin/addOpera/edit/:id', (req, res) => {
    let id = req.params.id;
    Opera.findById(id, (err, opera) => {
        if (err) {
            res.redirect('/login/admin/addOpera');
        } else {
            if (opera == null) {
                res.redirect('/login/admin/addOpera');
            } else {
                res.render('edit_opera', {
                    titles: 'Edit Opera',
                    opera: opera,
                })
            }
        }
    })
})

//theatre
router.get('/login/admin/addTheatre/edit/:id', (req, res) => {
    let id = req.params.id;
    Theatre.findById(id, (err, theatre) => {
        if (err) {
            res.redirect('/login/admin/addTheatre');
        } else {
            if (theatre == null) {
                res.redirect('/login/admin/addTheatre');
            } else {
                res.render('edit_theatre', {
                    titles: 'Edit Theatre',
                    theatre: theatre,
                })
            }
        }
    })
})
//update

//cinema
router.post('/login/admin/addCinema/edit/:id', upload, (req, res) => {

    let id = req.params.id;
    let new_image = '';

    if (req.file) {
        new_image = req.file.filename;
        try {
            unlinkSync('/build/static/media/' + req.body.old_image);
        } catch (err) {
            console.log(err);
        }
    } else {
        new_image = req.body.old_image;
    }
    Cinema.findByIdAndUpdate(id, {
        title: req.body.title,
        image: new_image,
        description: req.body.description,
    }, (err, result) => {
        if (err) {
            res.json({ message: err.message, type: 'danger' });
        } else {
            req.session.message = {
                type: 'success',
                message: 'Cinema updated successfully',
            };
            res.redirect('/login/admin/addCinema')
        }
    })
})


//cafe
router.post('/login/admin/addCafe/edit/:id', upload, (req, res) => {

    let id = req.params.id;
    let new_image = '';

    if (req.file) {
        new_image = req.file.filename;
        try {
            unlinkSync('/build/static/media/' + req.body.old_image);
        } catch (err) {
            console.log(err);
        }
    } else {
        new_image = req.body.old_image;
    }
    Cafe.findByIdAndUpdate(id, {
        title: req.body.title,
        image: new_image,
        description: req.body.description,
    }, (err, result) => {
        if (err) {
            res.json({ message: err.message, type: 'danger' });
        } else {
            req.session.message = {
                type: 'success',
                message: 'Cafe updated successfully',
            };
            res.redirect('/login/admin/addCafe')
        }
    })
})

//restaurant
router.post('/login/admin/addRestaurant/edit/:id', upload, (req, res) => {

    let id = req.params.id;
    let new_image = '';

    if (req.file) {
        new_image = req.file.filename;
        try {
            unlinkSync('/build/static/media/' + req.body.old_image);
        } catch (err) {
            console.log(err);
        }
    } else {
        new_image = req.body.old_image;
    }
    Restaurant.findByIdAndUpdate(id, {
        title: req.body.title,
        image: new_image,
        description: req.body.description,
    }, (err, result) => {
        if (err) {
            res.json({ message: err.message, type: 'danger' });
        } else {
            req.session.message = {
                type: 'success',
                message: 'Restaurant updated successfully',
            };
            res.redirect('/login/admin/addRestaurant')
        }
    })
})

//club
router.post('/login/admin/addClub/edit/:id', upload, (req, res) => {

    let id = req.params.id;
    let new_image = '';

    if (req.file) {
        new_image = req.file.filename;
        try {
            unlinkSync('/build/static/media/' + req.body.old_image);
        } catch (err) {
            console.log(err);
        }
    } else {
        new_image = req.body.old_image;
    }
    Club.findByIdAndUpdate(id, {
        title: req.body.title,
        image: new_image,
        description: req.body.description,
    }, (err, result) => {
        if (err) {
            res.json({ message: err.message, type: 'danger' });
        } else {
            req.session.message = {
                type: 'success',
                message: 'Club updated successfully',
            };
            res.redirect('/login/admin/addClub')
        }
    })
})

//pub
router.post('/login/admin/addPub/edit/:id', upload, (req, res) => {

    let id = req.params.id;
    let new_image = '';

    if (req.file) {
        new_image = req.file.filename;
        try {
            unlinkSync('/build/static/media/' + req.body.old_image);
        } catch (err) {
            console.log(err);
        }
    } else {
        new_image = req.body.old_image;
    }
    Pub.findByIdAndUpdate(id, {
        title: req.body.title,
        image: new_image,
        description: req.body.description,
    }, (err, result) => {
        if (err) {
            res.json({ message: err.message, type: 'danger' });
        } else {
            req.session.message = {
                type: 'success',
                message: 'Pub updated successfully',
            };
            res.redirect('/login/admin/addPub')
        }
    })
})

//party
router.post('/login/admin/addParty/edit/:id', upload, (req, res) => {

    let id = req.params.id;
    let new_image = '';

    if (req.file) {
        new_image = req.file.filename;
        try {
            unlinkSync('/build/static/media/' + req.body.old_image);
        } catch (err) {
            console.log(err);
        }
    } else {
        new_image = req.body.old_image;
    }
    Party.findByIdAndUpdate(id, {
        title: req.body.title,
        image: new_image,
        description: req.body.description,
    }, (err, result) => {
        if (err) {
            res.json({ message: err.message, type: 'danger' });
        } else {
            req.session.message = {
                type: 'success',
                message: 'Party updated successfully',
            };
            res.redirect('/login/admin/addParty')
        }
    })
})

//opera
router.post('/login/admin/addOpera/edit/:id', upload, (req, res) => {

    let id = req.params.id;
    let new_image = '';

    if (req.file) {
        new_image = req.file.filename;
        try {
            unlinkSync('/build/static/media/' + req.body.old_image);
        } catch (err) {
            console.log(err);
        }
    } else {
        new_image = req.body.old_image;
    }
    Opera.findByIdAndUpdate(id, {
        title: req.body.title,
        image: new_image,
        description: req.body.description,
    }, (err, result) => {
        if (err) {
            res.json({ message: err.message, type: 'danger' });
        } else {
            req.session.message = {
                type: 'success',
                message: 'Opera updated successfully',
            };
            res.redirect('/login/admin/addOpera')
        }
    })
})

//theatre
router.post('/login/admin/addTheatre/edit/:id', upload, (req, res) => {

    let id = req.params.id;
    let new_image = '';

    if (req.file) {
        new_image = req.file.filename;
        try {
            unlinkSync('/build/static/media/' + req.body.old_image);
        } catch (err) {
            console.log(err);
        }
    } else {
        new_image = req.body.old_image;
    }
    Theatre.findByIdAndUpdate(id, {
        title: req.body.title,
        image: new_image,
        description: req.body.description,
    }, (err, result) => {
        if (err) {
            res.json({ message: err.message, type: 'danger' });
        } else {
            req.session.message = {
                type: 'success',
                message: 'Theatre updated successfully',
            };
            res.redirect('/login/admin/addTheatre')
        }
    })
})

//delete

//cinema
router.get('/login/admin/addCinema/delete/:id', (req, res) => {
    let id = req.params.id;
    Cinema.findByIdAndRemove(id, (err, result) => {
        if (result.image !== '') {
            try {
                unlinkSync('/build/static/media/' + result.image);
            } catch (err) {
                console.log(err);
            }
        }
        if (err) {
            res.json({ message: err.message });
        } else {
            req.session.message = {
                type: 'info',
                message: 'Cinema deleted successfully',
            };
            res.redirect("/login/admin/addCinema");
        }
    })
})


//cafe
router.get('/login/admin/addCafe/delete/:id', (req, res) => {
    let id = req.params.id;
    Cafe.findByIdAndRemove(id, (err, result) => {
        if (result.image !== '') {
            try {
                unlinkSync('/build/static/media/' + result.image);
            } catch (err) {
                console.log(err);
            }
        }
        if (err) {
            res.json({ message: err.message });
        } else {
            req.session.message = {
                type: 'info',
                message: 'Cafe deleted successfully',
            };
            res.redirect("/login/admin/addCafe");
        }
    })
})

//restaurant
router.get('/login/admin/addRestaurant/delete/:id', (req, res) => {
    let id = req.params.id;
    Restaurant.findByIdAndRemove(id, (err, result) => {
        if (result.image !== '') {
            try {
                unlinkSync('/build/static/media/' + result.image);
            } catch (err) {
                console.log(err);
            }
        }
        if (err) {
            res.json({ message: err.message });
        } else {
            req.session.message = {
                type: 'info',
                message: 'Restaurant deleted successfully',
            };
            res.redirect("/login/admin/addRestaurant");
        }
    })
})

//club
router.get('/login/admin/addClub/delete/:id', (req, res) => {
    let id = req.params.id;
    Club.findByIdAndRemove(id, (err, result) => {
        if (result.image !== '') {
            try {
                unlinkSync('/build/static/media/' + result.image);
            } catch (err) {
                console.log(err);
            }
        }
        if (err) {
            res.json({ message: err.message });
        } else {
            req.session.message = {
                type: 'info',
                message: 'Club deleted successfully',
            };
            res.redirect("/login/admin/addClub");
        }
    })
})

//pub
router.get('/login/admin/addPub/delete/:id', (req, res) => {
    let id = req.params.id;
    Pub.findByIdAndRemove(id, (err, result) => {
        if (result.image !== '') {
            try {
                unlinkSync('/build/static/media/' + result.image);
            } catch (err) {
                console.log(err);
            }
        }
        if (err) {
            res.json({ message: err.message });
        } else {
            req.session.message = {
                type: 'info',
                message: 'Pub deleted successfully',
            };
            res.redirect("/login/admin/addPub");
        }
    })
})

//party
router.get('/login/admin/addParty/delete/:id', (req, res) => {
    let id = req.params.id;
    Party.findByIdAndRemove(id, (err, result) => {
        if (result.image !== '') {
            try {
                unlinkSync('/build/static/media/' + result.image);
            } catch (err) {
                console.log(err);
            }
        }
        if (err) {
            res.json({ message: err.message });
        } else {
            req.session.message = {
                type: 'info',
                message: 'Party deleted successfully',
            };
            res.redirect("/login/admin/addParty");
        }
    })
})

//opera
router.get('/login/admin/addOpera/delete/:id', (req, res) => {
    let id = req.params.id;
    Opera.findByIdAndRemove(id, (err, result) => {
        if (result.image !== '') {
            try {
                unlinkSync('/build/static/media/' + result.image);
            } catch (err) {
                console.log(err);
            }
        }
        if (err) {
            res.json({ message: err.message });
        } else {
            req.session.message = {
                type: 'info',
                message: 'Opera deleted successfully',
            };
            res.redirect("/login/admin/addOpera");
        }
    })
})

//theatre
router.get('/login/admin/addTheatre/delete/:id', (req, res) => {
    let id = req.params.id;
    Theatre.findByIdAndRemove(id, (err, result) => {
        if (result.image !== '') {
            try {
                unlinkSync('/build/static/media/' + result.image);
            } catch (err) {
                console.log(err);
            }
        }
        if (err) {
            res.json({ message: err.message });
        } else {
            req.session.message = {
                type: 'info',
                message: 'Theatre deleted successfully',
            };
            res.redirect("/login/admin/addTheatre");
        }
    })
})


module.exports = router;