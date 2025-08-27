import { createClient } from "redis";
import { client } from "@repo/db/client";

const redisClient = await createClient()
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();

async function pushWebsites() {
  const websites = await client.website.findMany();
  await Promise.all(
    websites.map(site => redisClient.xAdd("websites", "*", { data: site.url }))
  );
  setTimeout(pushWebsites, 3000);
}

pushWebsites();