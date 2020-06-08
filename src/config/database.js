const mongoose= require('mongoose')
const config=require('config')

const connectDB = async() =>{

    try {
        
        await mongoose.connect("mongodb+srv://sanjay98:sanjay98@devconnector-yv4dw.mongodb.net/test?retryWrites=true&w=majority",{
            useUnifiedTopology: true,
            useNewUrlParser:true,
            useCreateIndex:true,
            useFindAndModify:false 
        });

        console.log("MongoDb Connected");

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports=connectDB;
