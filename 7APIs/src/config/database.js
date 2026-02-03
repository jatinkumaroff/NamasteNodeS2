const mongoose=require('mongoose');
const express=require('express')
const app=express()
//connection string is used here,to connect to online db 

// db can connect or not, so insteadd wrap it in async await and then handle the case , like:

const connectDB = async ()=>{
    await mongoose.connect('mongodb://127.0.0.1:27017/DevTinder')
}











module.exports = connectDB
