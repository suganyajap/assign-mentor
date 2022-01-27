// const express=require("express");
import express from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";


dotenv.config();
console.log(process.env);
const app=express();
const PORT=process.env.PORT;
app.use(express.json());
// const MONGO_URL="mongodb://localhost";
const MONGO_URL=process.env.MONGO_URL;
    async function createConnection(){
    const client=new MongoClient(MONGO_URL);
    await client.connect();
    console.log("mongodb connected");
    return client;
}

const client=await createConnection();

//Home page
app.get("/",(request,response)=>{
    response.send("Hello Everyone");
});

//get all mentors
app.get("/mentor",async (request,response)=>{
    const mentor= await client.db("b28wd").collection("mentors").find({}).toArray();
    response.send(mentor);
});


//assign students to mentors
app.put("/mentor/:id" ,async (request,response)=>{
   const { id } = request.params;
   const data=request.body;
   const stud_assign = await client.db("b28wd").collection("mentors").findOneAndUpdate({id:id},{$set:data});
   response.send(stud_assign)
});

//change mentor
app.put("/change-mentor/:stud_id" ,async (request,response)=>{
    const { stud_id } = request.params;
    const data=request.body;
    const result = await client.db("b28wd").collection("students").updateOne({stud_id:stud_id},{$set:data});
    response.send(result);
 });

 //create mentor
app.post("/createMentor",async (request,response)=>{
    const data=request.body;
    const result= await client.db("b28wd").collection("mentors").insertMany(data);
    response.send(result);
});

//create student
app.post("/createStudent",async (request,response)=>{
    const data=request.body;
    const result= await client.db("b28wd").collection("students").insertMany(data);
    response.send(result);
});


app.listen(PORT,()=>console.log("App is started in",PORT));