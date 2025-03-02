// app/page.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
      <h1 className="text-4xl font-bold mb-6 text-center">ジンエクスプローラーへようこそ</h1>
      <p className="text-xl mb-8 text-center max-w-2xl">
        世界中のジンを探索し、その味わい、産地、蒸留所について学びましょう。
        お気に入りのジンを見つけて、新しい発見をしましょう。
      </p>
      <div className="flex gap-4">
        <Link href="/gins">
          <Button size="lg">ジンを探す</Button>
        </Link>
        <Link href="/distilleries">
          <Button size="lg" variant="outline">蒸留所を見る</Button>
        </Link>
      </div>
    </div>
  )
}