// components/custom/navigation.tsx
import Link from 'next/link'
import { ModeToggle } from './mode-toggle'

export function Navigation() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          ジンエクスプローラー
        </Link>
        
        <nav className="flex items-center space-x-6">
          <Link href="/gins" className="hover:underline">
            ジン一覧
          </Link>
          <Link href="/distilleries" className="hover:underline">
            蒸留所
          </Link>
          <Link href="/countries" className="hover:underline">
            産地
          </Link>
          <ModeToggle />
        </nav>
      </div>
    </header>
  )
}