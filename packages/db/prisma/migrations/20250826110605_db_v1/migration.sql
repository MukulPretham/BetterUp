/*
  Warnings:

  - You are about to drop the column `Password` on the `User` table. All the data in the column will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "Password",
ADD COLUMN     "password" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."Website" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Website_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserToWebsite" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,

    CONSTRAINT "UserToWebsite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Region" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Status" (
    "id" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "regionId" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Latency" (
    "id" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "regionId" TEXT NOT NULL,
    "latency" INTEGER NOT NULL,

    CONSTRAINT "Latency_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."UserToWebsite" ADD CONSTRAINT "UserToWebsite_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "public"."Website"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserToWebsite" ADD CONSTRAINT "UserToWebsite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Status" ADD CONSTRAINT "Status_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "public"."Website"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Status" ADD CONSTRAINT "Status_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "public"."Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Latency" ADD CONSTRAINT "Latency_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "public"."Website"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Latency" ADD CONSTRAINT "Latency_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "public"."Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
