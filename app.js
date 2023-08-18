const express = require('express');
const bodyParser = require('body-parser');
const app=express();//instance of express to access all the methods

const postsRoute = require('./routes/posts');
const userRoute = require('./routes/user');

const imageRoute = require('./routes/image')

app.use(bodyParser.json());

app.use("/posts", postsRoute);

app.use("/user", userRoute);

app.use("/image", imageRoute);

module.exports = app;



//app.get('/',(req,res)=>{
//   res.send("hello world"); // call back function
//});

//app.get('/blog',(req,res)=>{
//  res.send("hello blog"); // call back function
//});