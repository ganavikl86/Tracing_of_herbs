
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let users = [];
let herbs = {};

app.post("/signup",(req,res)=>{
  const {username,password,role}=req.body;
  users.push({username,password,role});
  res.json({message:"Signup successful"});
});

app.post("/login",(req,res)=>{
  const {username,password}=req.body;
  const u=users.find(x=>x.username===username && x.password===password);
  if(!u) return res.status(401).json({message:"Invalid credentials"});
  res.json({message:"Login successful",role:u.role});
});

app.post("/addHerb",(req,res)=>{
  const h=req.body;
  herbs[h.batchId]={...h,timestamp:new Date().toISOString()};
  res.json({message:"Herb added successfully"});
});

app.get("/verify/:id",(req,res)=>{
  const herb=herbs[req.params.id];
  if(!herb) return res.status(404).json({message:"Not found"});
  res.json(herb);
});

app.listen(5000,()=>console.log("Backend running at http://localhost:5000"));
