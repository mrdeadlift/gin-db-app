-- CreateTable
CREATE TABLE "gins" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "abv" DOUBLE PRECISION,
    "priceRange" TEXT,
    "imageUrl" TEXT,
    "officialSiteUrl" TEXT,
    "amazonUrl" TEXT,
    "distilleryId" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "distilleries" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "location" TEXT,
    "website" TEXT,
    "foundedYear" INTEGER,
    "countryId" TEXT NOT NULL,

    CONSTRAINT "distilleries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "countries" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "region" TEXT,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "botanicals" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "botanicals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gin_botanicals" (
    "ginId" TEXT NOT NULL,
    "botanicalId" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "gin_botanicals_pkey" PRIMARY KEY ("ginId","botanicalId")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorites" (
    "userId" TEXT NOT NULL,
    "ginId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "favorites_pkey" PRIMARY KEY ("userId","ginId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "gins" ADD CONSTRAINT "gins_distilleryId_fkey" FOREIGN KEY ("distilleryId") REFERENCES "distilleries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gins" ADD CONSTRAINT "gins_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "distilleries" ADD CONSTRAINT "distilleries_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gin_botanicals" ADD CONSTRAINT "gin_botanicals_ginId_fkey" FOREIGN KEY ("ginId") REFERENCES "gins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gin_botanicals" ADD CONSTRAINT "gin_botanicals_botanicalId_fkey" FOREIGN KEY ("botanicalId") REFERENCES "botanicals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_ginId_fkey" FOREIGN KEY ("ginId") REFERENCES "gins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
