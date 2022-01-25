// const express=require("express");
import express from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
const app=express();
dotenv.config();
console.log(process.env);
app.use(express.json());
const PORT=process.env.PORT;
const MONGO_URL="mongodb://localhost";
async function createConnection(){
    const client=new MongoClient(MONGO_URL);
    await client.connect();
    console.log("mongodb connected");
    return client;
}
const client=await createConnection();
app.get("/",(request,response)=>{
    response.send("Hello Everyone");
});
app.listen(PORT,()=>console.log("App is started in",PORT));