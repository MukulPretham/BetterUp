import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
// Your NextAuth config
import { NextResponse } from "next/server";
import { client } from "@repo/db/client";
import { cookies } from "next/headers";

interface Info {
  siteId: string,
  siteName: string,
  siteUrl: string,
  region: string
  status: boolean
}

export async function GET(req: Request) {
  const session = await getServerSession();
  console.log(session)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  //sending webites 
  const currUser = await client.user.findFirst({
    where: {
      username: session.user?.name || ""
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
  });

  const Info: Info[] = []

  

  for (const siteInfo of sitesInfo) {
    for (const region of regions) {
      const currStatus = await client.status.findFirst({
        where: {
          siteId: siteInfo.id,
          regionId: region.id
        }
      });
  
      Info.push({
        siteId: siteInfo.id,
        siteName: siteInfo.name,
        siteUrl: siteInfo.url,
        region: region.name,
        status: currStatus?.status || false
      });
    }
  }
  console.log(Info);
return NextResponse.json(Info)
}
