// components/custom/gin-results.tsx
import { GinCard } from '@/components/custom/gin-card'
import { prisma } from '@/lib/prisma'
import { SearchFilters } from '@/types'

// Gin型を定義
interface Gin {
  id: string;
  name: string;
  countryId: string;
  distilleryId: string;
  country: { id: string; name: string };
  distillery: { id: string; name: string };
}

interface GinResultsProps {
  searchParams: SearchFilters
}

export async function GinResults({ searchParams }: GinResultsProps) {
  // searchParamsをawaitする
  const params = await searchParams;
  const { query, countryId, distilleryId } = params;
  
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
    },
    orderBy: {
      name: 'asc',
    },
  })
  
  if (gins.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2">検索結果がありません</h2>
        <p>検索条件を変更して、もう一度お試しください。</p>
      </div>
    )
  }
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{gins.length}件のジンが見つかりました</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {gins.map((gin: any) => (
          <GinCard key={gin.id} gin={gin} />
        ))}
      </div>
    </div>
  )
}