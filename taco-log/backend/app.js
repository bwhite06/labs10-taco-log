
const express = require("express");
//const knex = require("knex");
const server = express();
const http = require ("http");
//const dbConfig = require("../knexfile.js");
//const db = knex(dbConfig.development);
//const cors = require("cors");
//server.use(cors());
//server.use(express.json());
const userDb = require('./database/helpers/dbhelper.js');


 
pg.connect(process.env.DATABASE_URL, function(err, client, done) {
   client.query('SELECT * FROM users', function(err, result) {
      done();
      if(err) return console.error(err);
      console.log(result.rows);
   });
});

server.get("/", (req, res) => {
  res.json({message: "Hello, World"});
})

server.get('/api/users',(req,res)=>{
  userDb.find()
  .then(user =>{
    console.log('Success', user);
    res.status(200).json(user)
  })
  .catch(err =>{
    res.send(err)
  } )
});
server.get(`/api/users/:id`,(req,res) =>{
  userDb.findByUserId(req.params.id)
  .then(user=>{
    console.log('Success',user);
    res.status(200).json(user)
  })
  .catch(err=>res.send(err))
});

server.listen(process.env.PORT, () =>
  {console.log("test")});