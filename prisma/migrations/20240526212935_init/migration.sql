-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_targetId_fkey";

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "targetId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
