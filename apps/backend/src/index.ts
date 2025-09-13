import { client } from "@repo/db/client"
import express, { json } from "express"
import jwt from "jsonwebtoken"
import { signUpReq, Website } from "./types"
import dotenv from "dotenv"
import { authMiddleware, AuthRequest } from "./middleware"
import { initDB } from "./helpers"

const app = express();

app.use(express.json());
dotenv.config();

// CORS middleware (must be before routes)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.post("/signUp",async(req,res)=>{
    const body: signUpReq = req.body;
    if (!body.password || !body.username ||!body.email){
        res.status(404).json({"error":"invalid format"});
        return
    }
    const exist = await client.user.findMany({
        where:{
            OR: [
                { username: body.username },
                { email: body.email }
            ]
        }
    })
    if(exist.length != 0){
        res.status(404).json({"error": "username alredy exist"});
        return
    };
    await client.user.create({
        data:{
            username: body.username,
            password: body.password,
            email: body.email
        }
    });
    res.json({"message": "account created"});
});

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
        res.status(404).json({"error":"user does'nt exist"});
        return;
    }
    if (currUser?.password != body.password ){
        res.status(404).json({"error":"wrong password"});
        return;
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
    const currUsername: any = req.user;
    try{
        //Get the current user details
        const currUser = await client.user.findFirst({
            where:{
                username: currUsername
            }
        });

        //Before adding website to the db, check if already exist
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
        //Get the current website details
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

        //If user has already is montoring the webiste, then dont add it to the userToWebsite
        const alreadyMontoring = await client.userToWebsite.findFirst({
            where:{
                userId: currUser.id,
                siteId: currWebsite.id
            }
        });
        if(!alreadyMontoring){
            await client.userToWebsite.create({
                data:{
                    userId: currUser?.id,
                    siteId: currWebsite?.id
                }
            });
        }else{
            return res.json({message: "you are already monitoring the given wensite website"})
        }
    }catch(err){
        console.log(err)
        res.status(404).json({"error":"db error"})
        return
    }
    res.json({message: "added"})
});

app.post("/addRegion",async(req,res)=>{
    const body = req.body
    const region = body?.region
    await client.region.create({
        data:{
            name: region
        }
    })
    res.json({message: "done"})
});

app.get("/getWebsites",authMiddleware,async(req:AuthRequest,res)=>{
    const currUsername: any = req.user;
    try{
        //Get the current user details
        const currUser = await client.user.findFirst({
            where:{
                username: currUsername
            }
        });
        if (!currUser){
            res.status(404).json({"error":"db error"})
            return
        }
        const userWebsites = await client.userToWebsite.findMany({
            where:{
                userId: currUser.id
            }
        })
        const siteIds = userWebsites.map((item)=>{
            return item.siteId
        })
        const websites = await client.website.findMany({
            where:{
                id: {
                    in: siteIds
                }
            }
        })
        res.json(websites)
    }catch(err){
        console.log(err)
        res.status(404).json({"error":"db error"})
        return
    }
})

app.get("/getRegions",async(req,res)=>{
    const regions = await client.region.findMany();
    res.json(regions)
})

// Get user's websites
app.listen(3001,()=>{
    console.log("server is running")
})