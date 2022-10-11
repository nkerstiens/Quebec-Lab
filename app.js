const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
const MongoClient = require('mongodb').MongoClient
const app = express();
const { ObjectId } = require('mongodb');

dotenv.config({path:'config.env'});

app.use(bodyParser.urlencoded({ extended: true }))


MongoClient.connect(process.env.MONGO_URI, { 
    useUnifiedTopology: true}) 
    .then(client =>{
      console.log('connected to db')
      const db = client.db('roster')
      const playersCollection = db.collection('players')  
      
      app.set('view engine', 'ejs')
      app.use(bodyParser.urlencoded({ extended: true }))
      app.use(bodyParser.json());
      app.use(express.static('public'));
      

      app.get('/', (req, res) => {
        db.collection('players').find().toArray()
          .then(results => {
            res.render('index.ejs', { players: results})
          })
          .catch(error => console.error(error))
        // res.render('index.ejs', {})  
      })

      app.post('/players', (req, res) => {
        playersCollection.insertOne(req.body)
          .then(result => {
            res.redirect('/')
          })
          .catch(error => console.error(error))
      })

      // app.post('/players', (req,res) => {
      //     console.log(req.body);
      // })

    //   app.delete('/players/:id', (req,res)=>{
    //     const id=req.params.id;
    
    //     playersCollection.findOneAndDelete(id)
    //       .then(data=>{
    //         if(!data){
    //             res.status(404).send({message: "cannot work"})
    //         }else{
    //             res.send({
    //                 message:"User was deleted"
    //             })
    //         }
    //       })
    //       .catch(err=>{
    //         res.status(500).send({
    //             message:"cannot delete"
    //         });
    //       });
    // })

    app.post('/deletePlayer/:id', async (req,res)=>{
      
      console.log("id", req.params.id); 
      // console.log("name", req.sparams.name); 

      let result = await playersCollection.findOneAndDelete( 
        {
        // _id : `"ObjectId("${req.params.id}")"`
        // "_id": ObjectId("6340b4a0716efae98339f1d7")
        // "_id": "ObjectId(\"6340b4a0716efae98339f1d7\")"
        // "_id" : "ObjectId(6340b4a0716efae98339f1d7)"
        // _id : req.params.id
        // name :  req.params.name
        // "_id" :  `ObjectId('${req.params.id}')`
        // _id :  ObjectId('${req.params.id}')
        // "_id" : "6340ba72e3120ac27bd0ea9c"
        // "_id.$oid" : "6340ba72e3120ac27bd0ea9c"
        "_id": ObjectId(req.params.id)

        // name : "adfs"

       }
      )
      .then(result => {
        //res.json(`Deleted Darth Vader's quote`)
        console.log(result); 
        res.redirect('/');
      })
      .catch(error => console.error(error))
    })

      app.listen(3000, function() {
          console.log("listening");
      })
  })
.catch(error => console.error(error))
