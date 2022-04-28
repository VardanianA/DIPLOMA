const express = require('express');
const pub_router = express.Router();
const client = require("mongodb").MongoClient;
const connectionString = "mongodb://localhost:27017";

pub_router.get('/', (req, res) => {
    (async () => {
        let connection = await client.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        let db = connection.db("venuedb");

        db.collection('pubs').find().toArray((err, pubs) => {
            if (err) {
                res.json({ message: err.message });
            } else {
                res.json({ pubs: pubs })
            }
        })
    })().catch((error) => console.log(error));
})

module.exports = pub_router;