const express = require('express');
const cinema_router = express.Router();
const client = require("mongodb").MongoClient;
const connectionString = "mongodb://localhost:27017";

cinema_router.get('/', (req, res) => {
    (async () => {
        let connection = await client.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        let db = connection.db("venuedb");

        db.collection('cinemas').find().toArray((err, cinemas) => {
            if (err) {
                res.json({ message: err.message });
            } else {
                res.json({ cinemas: cinemas })
            }
        })
    })().catch((error) => console.log(error));
})

module.exports = cinema_router;