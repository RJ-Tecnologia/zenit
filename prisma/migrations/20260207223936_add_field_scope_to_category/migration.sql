/*
  Warnings:

  - Added the required column `scope` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CategoryScope" AS ENUM ('INCOME', 'OUTCOME', 'BOTH');

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "scope" "CategoryScope" NOT NULL;
