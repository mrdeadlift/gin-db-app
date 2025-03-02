import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // 国データ
  const uk = await prisma.country.upsert({
    where: { id: 'clq1234567890' },
    update: {},
    create: {
      id: 'clq1234567890',
      name: 'イギリス',
      region: 'ヨーロッパ',
    },
  })
  
  const japan = await prisma.country.upsert({
    where: { id: 'clq2345678901' },
    update: {},
    create: {
      id: 'clq2345678901',
      name: '日本',
      region: 'アジア',
    },
  })
  
  // 蒸留所データ
  const beefeater = await prisma.distillery.upsert({
    where: { id: 'clq3456789012' },
    update: {},
    create: {
      id: 'clq3456789012',
      name: 'ビーフィーター蒸留所',
      location: 'ロンドン',
      countryId: uk.id,
      foundedYear: 1863,
    },
  })
  
  const kyotoDistillery = await prisma.distillery.upsert({
    where: { id: 'clq4567890123' },
    update: {},
    create: {
      id: 'clq4567890123',
      name: '京都蒸溜所',
      location: '京都',
      countryId: japan.id,
      foundedYear: 2015,
    },
  })
  
  // ボタニカルデータ
  const juniper = await prisma.botanical.upsert({
    where: { id: 'clq5678901234' },
    update: {},
    create: {
      id: 'clq5678901234',
      name: 'ジュニパーベリー',
      description: 'ジンの主要な香り成分',
    },
  })
  
  const yuzu = await prisma.botanical.upsert({
    where: { id: 'clq6789012345' },
    update: {},
    create: {
      id: 'clq6789012345',
      name: '柚子',
      description: '日本の柑橘系果実',
    },
  })
  
  // ジンデータ
  const beefeaterGin = await prisma.gin.upsert({
    where: { id: 'clq7890123456' },
    update: {},
    create: {
      id: 'clq7890123456',
      name: 'ビーフィーター ロンドン ドライ ジン',
      description: '1863年から続く伝統的なロンドンドライジン。9種類のボタニカルを使用し、ジュニパーの香りが特徴的。',
      abv: 40,
      priceRange: '2,000円〜3,000円',
      imageUrl: '/images/beefeater.jpg',
      officialSiteUrl: 'https://www.beefeatergin.com/',
      amazonUrl: 'https://www.amazon.co.jp/dp/B001TZ4IUC',
      distilleryId: beefeater.id,
      countryId: uk.id,
    },
  })
  
  const kinobi = await prisma.gin.upsert({
    where: { id: 'clq8901234567' },
    update: {},
    create: {
      id: 'clq8901234567',
      name: '季の美 京都ドライジン',
      description: '日本初のクラフトジン。柚子や緑茶など日本らしいボタニカルを使用した和のジン。',
      abv: 45.7,
      priceRange: '5,000円〜6,000円',
      imageUrl: '/images/kinobi.jpg',
      officialSiteUrl: 'https://kyotodistillery.jp/products/kinobi/',
      amazonUrl: 'https://www.amazon.co.jp/dp/B01N9TBGXE',
      distilleryId: kyotoDistillery.id,
      countryId: japan.id,
    },
  })
  
  // ジンとボタニカルの関連付け
  await prisma.ginBotanical.createMany({
    data: [
      {
        ginId: beefeaterGin.id,
        botanicalId: juniper.id,
        isPrimary: true,
      },
      {
        ginId: kinobi.id,
        botanicalId: juniper.id,
        isPrimary: true,
      },
      {
        ginId: kinobi.id,
        botanicalId: yuzu.id,
        isPrimary: false,
      },
    ],
    skipDuplicates: true,
  })
  
  console.log('シードデータの投入が完了しました')
}

main()
  .catch((e) => {
    console.error('シードデータの投入中にエラーが発生しました:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })