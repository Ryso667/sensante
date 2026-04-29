/*
  Warnings:

  - You are about to drop the column `date_naissance` on the `Patient` table. All the data in the column will be lost.
  - Added the required column `dateNaissance` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Made the column `region` on table `Patient` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Patient" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "dateNaissance" DATETIME NOT NULL,
    "sexe" TEXT NOT NULL,
    "telephone" TEXT,
    "adresse" TEXT,
    "region" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Patient" ("adresse", "createdAt", "id", "nom", "prenom", "region", "sexe", "telephone", "updatedAt") SELECT "adresse", "createdAt", "id", "nom", "prenom", "region", "sexe", "telephone", "updatedAt" FROM "Patient";
DROP TABLE "Patient";
ALTER TABLE "new_Patient" RENAME TO "Patient";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
