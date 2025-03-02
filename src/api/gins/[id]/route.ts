import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
  
  try {
    const gin = await prisma.gin.findUnique({
      where: { id },
      include: {
        country: true,
        distillery: {
          include: {
            country: true,
          },
        },
        botanicals: {
          include: {
            botanical: true,
          },
        },
      },
    })
    
    if (!gin) {
      return NextResponse.json(
        { error: '指定されたジンが見つかりません' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(gin)
  } catch (error) {
    console.error('ジン詳細取得エラー:', error)
    return NextResponse.json(
      { error: 'ジンの詳細取得中にエラーが発生しました' },
      { status: 500 }
    )
  }
}
