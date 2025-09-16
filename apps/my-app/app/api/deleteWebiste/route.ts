import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { client } from '@repo/db/client';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session || !session.user?.name) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json(); // { siteId }

    // Get current user
    const currUser = await client.user.findFirst({
      where: { username: session.user.name },
    });

    if (!currUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    console.log(body.siteId);
    // Check if user is monitoring this website
    const userSite = await client.userToWebsite.findFirst({
      where: {
        userId: currUser.id,
        siteId: body.siteId,
      },
    });

    if (!userSite) {
      return NextResponse.json({ error: 'Not monitoring this website' }, { status: 404 });
    }

    // Delete the userToWebsite link
    await client.userToWebsite.delete({
      where: { id: userSite.id },
    });

    return NextResponse.json({ message: 'Website deleted successfully', siteId: body.siteId });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
