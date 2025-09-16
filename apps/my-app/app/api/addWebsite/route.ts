import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { client } from '@repo/db/client'; // Your Prisma client

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

        return NextResponse.json({ message: 'Website added successfully' });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
