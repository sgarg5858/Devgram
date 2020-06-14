const express = require('express');
const connectDB = require('./config/database');
const bodyParser= require('body-parser');

//Defining Express App
const app=express();

//Body Parser for accepting data via req
app.use(bodyParser.urlencoded({
    extended: false
}))
var cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

app.use((request,response,next)=>
    {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Credentials", "true");
    response.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    response.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,x-auth-token");
    //next() here is mandatory otherwise request won't go outside this method....
    next();
    });

//Connection to MongoDB Atlas
connectDB();
app.get('/api',(req,res,next)=>{
    res.send("You are in here")
})
app.use('/api/users',require('./routes/users'))
app.use('/api/auth',require('./routes/auth'))
app.use('/api/profile',require('./routes/profile'));
app.use('/api/post', require('./routes/post'));
const PORT=process.env.PORT || 4000

app.listen(PORT,()=>{
    console.log(`Server Started on port ${PORT}`)
})

