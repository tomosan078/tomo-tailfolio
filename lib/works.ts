export type Work = {
  id: number
  title: string
  description: string
  link: string
}

export const works: Work[] = [
  {
    id: 1,
    title: "Portfolio Site",
    description: "Next.js + Tailwindで制作",
    link: "https://example.com"
  },
  {
    id: 2,
    title: "UI Design",
    description: "Figmaデザイン",
    link: "https://example.com"
  }
]
