import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';


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
        const redisClient =  createClient({
            url: "redis://better-up-redis:6379"
        });
        // const redisClient = createClient();
        await redisClient.connect();
        const allPromises = regions.map(async (region) => {
            const currStatus = await checkStatus(currWebsite.url)
            if (!currStatus) {


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
        const res = await axios.get(`http://${url}`, {
            timeout: 7000
        })
        return res.status >= 200 && res.status < 400; // 200–399 = reachable
    } catch {
        return false;
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession();

        if (!session || !session.user?.name) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json(); // { siteName, siteUrl }

        // Get current user
        const currUser = await client.user.findFirst({
            where: { username: session.user.name },
        });

        if (!currUser) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Check if website exists
        let currWebsite = await client.website.findFirst({
            where: { url: body.siteUrl },
        });

        // Create website if it doesn't exist
        if (!currWebsite) {

            currWebsite = await client.website.create({
                data: {
                    name: body.siteName,
                    url: body.siteUrl,
                },
            });
            await initDB(body.siteUrl);
        }

        // Check if user is already monitoring this website
        const alreadyMonitoring = await client.userToWebsite.findFirst({
            where: {
                userId: currUser.id,
                siteId: currWebsite.id,
            },
        });

        if (alreadyMonitoring) {
            return NextResponse.json({ message: 'You are already monitoring this website' });
        }

        // Link user and website
        await client.userToWebsite.create({
            data: {
                userId: currUser.id,
                siteId: currWebsite.id,
            },
        });

        return NextResponse.json({
            siteId: currWebsite.id,
            siteName: currWebsite.name,
            siteUrl: currWebsite.url,
            status: true
    });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
