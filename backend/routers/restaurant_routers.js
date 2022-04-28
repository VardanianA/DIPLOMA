const express = require('express');
const restaurant_router = express.Router();
const client = require("mongodb").MongoClient;
const connectionString = "mongodb://localhost:27017";

restaurant_router.get('/', (req, res) => {
    (async () => {
        let connection = await client.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        let db = connection.db("venuedb");

        db.collection('restaurants').find().toArray((err, restaurants) => {
            if (err) {
                res.json({ message: err.message });
            } else {
                res.json({ restaurants: restaurants })
            }
        })
    })().catch((error) => console.log(error));
})

module.exports = restaurant_router;