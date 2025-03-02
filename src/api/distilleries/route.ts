import { NextResponse } from 'next/server'
import { prisma } from '../../lib/prisma'

export async function GET() {
  try {
    const distilleries = await prisma.distillery.findMany({
      include: {
        country: true,
      },
      orderBy: {
        name: 'asc',
      },
    })
    
    return NextResponse.json(distilleries)
  } catch (error) {
    console.error('蒸留所一覧取得エラー:', error)
    return NextResponse.json(
      { error: '蒸留所一覧の取得中にエラーが発生しました' },
      { status: 500 }
    )
  }
}
