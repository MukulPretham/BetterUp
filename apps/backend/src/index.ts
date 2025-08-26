import { client } from "@repo/db/client"
import express, { json } from "express"
import jwt from "jsonwebtoken"
import { signUpReq, Website } from "./types"
import dotenv from "dotenv"
import { authMiddleware, AuthRequest } from "./middleware"
import { initDB } from "./helpers"

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

app.post("/addWebsite",authMiddleware,async(req:AuthRequest,res)=>{
    const body: Website = req.body;
    const currUsername: any = req.user?.username;
    try{
        const currUser = await client.user.findFirst({
            where:{
                username: currUsername
            }
        });

        const exist = await client.website.findFirst({
            where:{
                url: body.url
            }
        });
        if(!exist){
            const currWebsite = await client.website.create({
                data:{
                    name : body.name,
                    url: body.url
                }
            });
            await initDB(currWebsite.url)
        }

        const currWebsite = await client.website.findFirst({
            where:{
                url: body.url
            }
        });
        if (!currWebsite){
            return
        }

        

        if (!currUser || !currWebsite){
            res.status(404).json({"error":"db error"})
            return
        }
        await client.userToWebsite.create({
            data:{
                userId: currUser?.id,
                siteId: currWebsite?.id
            }
        });
    }catch(err){
        console.log(err)
        res.status(404).json({"error":"db error"})
        return
    }
    res.json({message: "added"})
})

app.post("/addRegion",async(req,res)=>{
    const body = req.body
    const region = body?.region
    await client.region.create({
        data:{
            name: region
        }
    })
    res.json({message: "done"})
})

app.listen(3000,()=>{
    console.log("server is running")
})

