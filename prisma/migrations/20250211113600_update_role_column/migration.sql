-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'UPLOAD_TEAM', 'DRAFTSMAN', 'SITE_INCHARGE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role";
