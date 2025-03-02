import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Gin } from '@/types'

interface GinCardProps {
  gin: Gin
}

export function GinCard({ gin }: GinCardProps) {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="aspect-square relative">
        <Image
          src={gin.imageUrl || '/placeholder-gin.jpg'}
          alt={gin.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-1">{gin.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-1 text-sm">
          <p>蒸留所: {gin.distillery.name}</p>
          <p>産地: {gin.country.name}</p>
          {gin.abv && <p>アルコール度数: {gin.abv}%</p>}
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/gins/${gin.id}`} className="w-full">
          <Button variant="default" className="w-full">
            詳細を見る
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}