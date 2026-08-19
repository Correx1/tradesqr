export const metadata = {
  title: 'TradeSqr Admin Studio',
  description: 'Sanity Content Management for TradeSqr',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ height: '100vh', width: '100vw', margin: 0, padding: 0 }}>
      {children}
    </div>
  )
}
