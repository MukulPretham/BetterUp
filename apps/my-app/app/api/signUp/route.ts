import { NextRequest, NextResponse } from 'next/server';
import { client } from '@repo/db/client';

export async function POST(req: NextRequest) {
  const body: { username?: string; password?: string; email?: string } = await req.json();

  if (!body.username || !body.password || !body.email) {
    return NextResponse.json({ error: 'invalid format' }, { status: 404 });
  }

  const exist = await client.user.findMany({
    where: {
      OR: [
        { username: body.username },
        { email: body.email },
      ],
    },
  });

  if (exist.length !== 0) {
    return NextResponse.json({ error: 'username alredy exist' }, { status: 404 });
  }

  await client.user.create({
    data: {
      username: body.username,
      password: body.password,
      email: body.email,
    },
  });

  return NextResponse.json({ message: 'account created' });
}
