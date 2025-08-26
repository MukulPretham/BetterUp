import { client } from "@repo/db/client";

export async function initDB(url: string) {
        try {
            const currWebsite = await client.website.findFirst({
                where: {
                    url: url
                }
            })
            if(!currWebsite){
                return
            }
            const regions = await client.region.findMany();
            const allPromises = regions.map(async (region) => {
                await client.status.create({
                    data: {
                        siteId: currWebsite?.id,
                        regionId: region.id,
                        status :false
                    }
                })
                await client.latency.create({
                    data: {
                        siteId: currWebsite?.id,
                        regionId: region.id,
                        latency : 0
                    }
                })
            })

            await Promise.all(allPromises)
            
        } catch (err) {
            console.log(err)
        }
}
