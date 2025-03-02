import { NextResponse } from 'next/server'
import { prisma } from '../../lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query') || ''
  const countryId = searchParams.get('countryId')
  const distilleryId = searchParams.get('distilleryId')
  
  try {
    const gins = await prisma.gin.findMany({
      where: {
        AND: [
          query ? { name: { contains: query, mode: 'insensitive' } } : {},
          countryId ? { countryId } : {},
          distilleryId ? { distilleryId } : {},
        ],
      },
      include: {
        country: true,
        distillery: true,
        botanicals: {
          include: {
            botanical: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    })
    
    return NextResponse.json(gins)
  } catch (error) {
    console.error('ジン検索エラー:', error)
    return NextResponse.json(
      { error: 'ジンの検索中にエラーが発生しました' },
      { status: 500 }
    )
  }
}
