import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
// Your NextAuth config
import { NextResponse } from "next/server";
import { client } from "@repo/db/client";

export async function GET(req: Request) {
  const session = await getServerSession();
  console.log(session)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  //sending webites 
  const currUser = await client.user.findFirst({
    where: {
      username: session.user?.name||""
    },
  })
  const webistes = await client.userToWebsite.findMany({
    where: {
      userId: currUser?.id || ""
    },
  })
  const siteIds = webistes.map((item) => {
    return item.siteId
  })
  const regions = await client.region.findMany()
  const sitesInfo = await client.website.findMany({
    where: {
      id: {
        in: siteIds
      }
    }
  })

  return NextResponse.json(sitesInfo)
}
