import { client } from "@repo/db/client";
import { createClient } from "redis";
import axios from "axios"

export async function initDB(url: string) {
    try {
        const currWebsite = await client.website.findFirst({
            where: {
                url: url
            }
        })
        if (!currWebsite) {
            return
        }
        const regions = await client.region.findMany();
        const allPromises = regions.map(async (region) => {
            const currStatus = await checkStatus(currWebsite.url)
            if (!currStatus) {
                const redisClient = createClient()
                await redisClient.connect();
                const res = await redisClient.xAdd(
                    'notifications', '*', {
                    "site": JSON.stringify({
                        siteId: currWebsite.id,
                        regionId: "all"
                    })
                }
                );
            }
            await client.status.create({
                data: {
                    siteId: currWebsite?.id,
                    regionId: region.id,
                    status: currStatus
                }
            })
            await client.latency.create({
                data: {
                    siteId: currWebsite?.id,
                    regionId: region.id,
                }
            })
        })

        await Promise.all(allPromises)

    } catch (err) {
        console.log(err)
    }
}

async function checkStatus(url: string): Promise<boolean> {
    try {
        const res = await axios.get(`http://${url}`,{
            timeout: 7000
        })
        return res.status >= 200 && res.status < 400; // 200–399 = reachable
    } catch {
        return false;
    }
}