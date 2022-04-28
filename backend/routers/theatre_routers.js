const express = require('express');
const theatre_router = express.Router();
const client = require("mongodb").MongoClient;
const connectionString = "mongodb://localhost:27017";

theatre_router.get('/', (req, res) => {
    (async () => {
        let connection = await client.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        let db = connection.db("venuedb");

        db.collection('theatres').find().toArray((err, theatres) => {
            if (err) {
                res.json({ message: err.message });
            } else {
                res.json({ theatres: theatres })
            }
        })
    })().catch((error) => console.log(error));
})

module.exports = theatre_router;