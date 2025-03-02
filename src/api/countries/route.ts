import { NextResponse } from 'next/server'
import { prisma } from '../../lib/prisma'

export async function GET() {
  try {
    const countries = await prisma.country.findMany({
      orderBy: {
        name: 'asc',
      },
    })
    
    return NextResponse.json(countries)
  } catch (error) {
    console.error('産地一覧取得エラー:', error)
    return NextResponse.json(
      { error: '産地一覧の取得中にエラーが発生しました' },
      { status: 500 }
    )
  }
}
