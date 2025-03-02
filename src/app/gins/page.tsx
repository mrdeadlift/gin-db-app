// app/gins/page.tsx
import { Suspense } from 'react'
import { SearchFilters } from '@/components/custom/search-filters'
import { GinResults } from '@/components/custom/gin-results'
import { prisma } from '@/lib/prisma'

interface GinsPageProps {
  searchParams: {
    query?: string
    countryId?: string
    distilleryId?: string
  }
}

export default async function GinsPage({ searchParams }: GinsPageProps) {
  const countries = await prisma.country.findMany({
    orderBy: { name: 'asc' },
  })
  
  const distilleries = await prisma.distillery.findMany({
    orderBy: { name: 'asc' },
  })
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">ジンを探す</h1>
      
      <SearchFilters 
        countries={countries} 
        distilleries={distilleries} 
      />
      
      <Suspense fallback={<div>読み込み中...</div>}>
        <GinResults searchParams={searchParams} />
      </Suspense>
    </div>
  )
}