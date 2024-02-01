const express = require('express');
const cors = require("cors");
const connectMongo = require('./connection/connectMongo')
const app= express();
app.use(express.json());
app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );



app.get("/", (req, res) => {
    res.end("<h1> Hello world </h1>");
  });

  
const userRoutes = require('./Routes/auth');
app.use('/user',userRoutes);

const pageRoutes = require('./Routes/pages');
app.use('/pages',pageRoutes);

app.listen(3003,()=>{
    console.log("post is runnin pn 3003");
});
