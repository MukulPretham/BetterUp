import { client } from "@repo/db/client"
import express, { json } from "express"
import jwt from "jsonwebtoken"
import { signUpReq } from "./types"
import dotenv from "dotenv"
import { authMiddleware } from "./middleware"

const app = express()

app.use(express.json())
dotenv.config()

app.post("/signUp",async(req,res)=>{
    const body: signUpReq = req.body;
    if (!body.password || !body.username){
        res.status(404).json({"error":"invalid format"});
        return
    }
    const exist = await client.user.findMany({
        where:{
            username: body.username
        }
    })
    if(exist.length != 0){
        res.status(404).json({"error": "username alredy exist"});
        return
    };
    await client.user.create({
        data:{
            username: body.username,
            password: body.password
        }
    });
    res.json({"message": "account created"});
})

app.post("/logIn",async(req,res)=>{
    const body: signUpReq = req.body;
    if (!body.password || !body.username){
        res.status(404).json({"error":"invalid format"});
        return
    }
    const currUser = await client.user.findFirst({
        where:{
            username: body.username
        }
    });
    if (!currUser){
        res.json(404).json({"error":"user does'nt exist"});
        return;
    }
    if (currUser?.password != body.password ){
        res.json(404).json({"error":"wrong password"});
    }
    if (!process.env?.JWT_SECRET){
        res.status(404).json({error: "server error"});
        return
    }
    const token = jwt.sign(body,process.env?.JWT_SECRET)
    res.json({
        token: token
    })
})


app.listen(3000,()=>{
    console.log("server is running")
})