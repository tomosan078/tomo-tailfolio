import "./globals.css"

export const metadata = {
  title: "Tomo Portfolio",
  description: "Modern Portfolio"
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
