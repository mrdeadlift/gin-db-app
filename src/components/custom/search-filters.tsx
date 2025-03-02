"use client"

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { Country, Distillery } from '@/types/index'

interface SearchFiltersProps {
  countries: Country[]
  distilleries: Distillery[]
}

export function SearchFilters({ countries, distilleries }: SearchFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [query, setQuery] = useState(searchParams.get('query') || '')
  const [countryId, setCountryId] = useState(searchParams.get('countryId') || '')
  const [distilleryId, setDistilleryId] = useState(searchParams.get('distilleryId') || '')

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (query) params.set('query', query)
    if (countryId) params.set('countryId', countryId)
    if (distilleryId) params.set('distilleryId', distilleryId)
    
    router.push(`/gins?${params.toString()}`)
  }

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="grid gap-4 md:grid-cols-4">
          <div className="md:col-span-2">
            <Input
              placeholder="ジン名を検索..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          
          <Select value={countryId} onValueChange={setCountryId}>
            <SelectTrigger>
              <SelectValue placeholder="産地を選択" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">すべての産地</SelectItem>
              {countries.map((country) => (
                <SelectItem key={country.id} value={country.id}>
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={distilleryId} onValueChange={setDistilleryId}>
            <SelectTrigger>
              <SelectValue placeholder="蒸留所を選択" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">すべての蒸留所</SelectItem>
              {distilleries.map((distillery) => (
                <SelectItem key={distillery.id} value={distillery.id}>
                  {distillery.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="md:col-span-4 flex justify-end">
            <Button onClick={handleSearch}>検索</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
