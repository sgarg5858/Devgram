const express = require('express');

const app=express();

app.get('/data',(req,res,next)=>{
    res.send("API running")
});

const PORT=process.env.PORT || 4000

app.listen(PORT,()=>{
    console.log(`Server Started on port ${PORT}`)
})