import { LenisProvider, Navbar } from '@/components/layout'
import { Footer } from '@/components/sections'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LenisProvider>
      <Navbar />
      <div className="flex-1 flex flex-col">{children}</div>
      <Footer />
    </LenisProvider>
  )
}
