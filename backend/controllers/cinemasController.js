const client = require("mongodb").MongoClient;
const connectionString = "mongodb://localhost:27017";


exports.cinemasController = (req, res) => {
    // res.json({
    //     cinemasList:['cinema1', 'cinema2']
    // })

 (async () => {
  let connection = await client.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
  let db = connection.db("venuedb");
  let collection = db.collection("cinemas");


      collection.find().exec((err, cinemas) => {
    if(err){
        res.json({message: err.message});
    }else {
        res.render('Cinema', {
            titles: "Home Page",
            cinemas: cinemas
        })
    }
})


})().catch((error) => console.log(error));

}