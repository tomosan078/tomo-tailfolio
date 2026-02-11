import "./globals.css"

export const metadata = {
  title: "tomosan078 Portfolio",
  description: "Portfolio"
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
