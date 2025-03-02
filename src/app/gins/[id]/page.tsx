// app/gins/[id]/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ExternalLink } from 'lucide-react'
import { prisma } from '@/lib/prisma'

interface GinPageProps {
  params: {
    id: string
  }
}

export default async function GinPage({ params }: GinPageProps) {
  const gin = await prisma.gin.findUnique({
    where: { id: params.id },
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
    notFound()
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="relative aspect-square">
          <Image
            src={gin.imageUrl || '/placeholder-gin.jpg'}
            alt={gin.name}
            fill
            className="object-cover rounded-lg"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        
        <div>
          <h1 className="text-3xl font-bold mb-2">{gin.name}</h1>
          
          <div className="space-y-4 mb-6">
            <div>
              <h2 className="text-lg font-semibold">蒸留所</h2>
              <p>{gin.distillery.name}</p>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold">産地</h2>
              <p>{gin.country.name}</p>
            </div>
            
            {gin.abv && (
              <div>
                <h2 className="text-lg font-semibold">アルコール度数</h2>
                <p>{gin.abv}%</p>
              </div>
            )}
            
            {gin.priceRange && (
              <div>
                <h2 className="text-lg font-semibold">価格帯</h2>
                <p>{gin.priceRange}</p>
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-3">
            {gin.officialSiteUrl && (
              <Link href={gin.officialSiteUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="flex items-center gap-2">
                  公式サイト <ExternalLink size={16} />
                </Button>
              </Link>
            )}
            
            {gin.amazonUrl && (
              <Link href={gin.amazonUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="flex items-center gap-2">
                  Amazonで購入 <ExternalLink size={16} />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
      
      {gin.description && (
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-3">説明</h2>
            <p className="whitespace-pre-line">{gin.description}</p>
          </CardContent>
        </Card>
      )}
      
      {gin.botanicals.length > 0 && (
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-3">ボタニカル</h2>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {gin.botanicals.map((item :any) => (
                <li key={item.botanicalId} className="flex items-center gap-2">
                  {item.isPrimary && <span className="text-primary">★</span>}
                  {item.botanical.name}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
      
      <div className="mt-8">
        <Link href="/gins">
          <Button variant="outline">ジン一覧に戻る</Button>
        </Link>
      </div>
    </div>
  )
}