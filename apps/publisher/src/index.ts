import { createClient } from "redis";
import { client } from "@repo/db/client";

const redisClient = await createClient()
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();

setInterval(async()=>{
    const websites = await client.website.findMany()
    websites.forEach((site)=>{
        redisClient.lPush("websites",JSON.stringify(site))
    })
},3000)