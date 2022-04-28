const express = require('express');
const club_router = express.Router();
const client = require("mongodb").MongoClient;
const connectionString = "mongodb://localhost:27017";

club_router.get('/', (req, res) => {
    (async () => {
        let connection = await client.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        let db = connection.db("venuedb");

        db.collection('clubs').find().toArray((err, clubs) => {
            if (err) {
                res.json({ message: err.message });
            } else {
                res.json({ clubs: clubs })
            }
        })
    })().catch((error) => console.log(error));
})

module.exports = club_router;