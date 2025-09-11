import { client } from "@repo/db/client";
import { createClient } from "redis";
import "http"

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
            
            await client.status.create({
                data: {
                    siteId: currWebsite?.id,
                    regionId: region.id
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