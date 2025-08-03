const express = require('express');
const path = require('path');
const app = express();
const pool = require('./db/db');

const reactPath = path.join(__dirname, '..', 'Views', 'dist');

app.use(express.static(reactPath));

app.get(/.*/,async(req,res,next)=>{
  try{
    const jsontest = await pool.query("SELECT NOW()");
    console.log("current date: " +jsontest.rows[0].now);
  }catch(err){
    console.log("errore " + err.message);
  }
  next(); 
});

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(reactPath, 'index.html'));
});

app.listen(4444, () => {
  console.log('Listening on http://localhost:4444/Home');
});
