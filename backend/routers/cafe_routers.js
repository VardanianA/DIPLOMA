const express = require('express');
const cafe_router = express.Router();
const client = require("mongodb").MongoClient;
const connectionString = "mongodb://localhost:27017";

cafe_router.get('/', (req, res) => {
    (async () => {
        let connection = await client.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        let db = connection.db("venuedb");

        db.collection('caves').find().toArray((err, cafes) => {
            if (err) {
                res.json({ message: err.message });
            } else {
                res.json({ cafes: cafes })
            }
        })
    })().catch((error) => console.log(error));
})

module.exports = cafe_router;