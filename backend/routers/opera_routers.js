const express = require('express');
const opera_router = express.Router();
const client = require("mongodb").MongoClient;
const connectionString = "mongodb://localhost:27017";

opera_router.get('/', (req, res) => {
    (async () => {
        let connection = await client.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        let db = connection.db("venuedb");

        db.collection('operas').find().toArray((err, operas) => {
            if (err) {
                res.json({ message: err.message });
            } else {
                res.json({ operas: operas })
            }
        })
    })().catch((error) => console.log(error));
})

module.exports = opera_router;