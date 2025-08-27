import { createClient } from "redis";
// import { client } from "@repo/db";

const redisClient = await createClient().on("error",()=>{
    console.log("error while connecting to redis")
}).connect();

while(true){
    const response = await redisClient.xReadGroup("consumerGroup","worker1",{
        key: 'websites',
        id: '>'
    },{
        COUNT: 1,
        BLOCK: 0
    });
    if (response && Array.isArray(response)) {
        const stream: any = response[0];   
        if (stream){
            const firstMsg  = stream.messages[0] ;       
            console.log(firstMsg.id);                  
            console.log(firstMsg.message);   
            redisClient.xAck("websites","consumerGroup",firstMsg.id)  
        }      
                    
    }
}