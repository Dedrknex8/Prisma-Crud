-- DropForeignKey
ALTER TABLE "Games" DROP CONSTRAINT "Games_developerId_fkey";

-- AddForeignKey
ALTER TABLE "Games" ADD CONSTRAINT "Games_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "Developer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
