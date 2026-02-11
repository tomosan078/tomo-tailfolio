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
    link: "https://www.7omo.work/"
  },
  {
    id: 2,
    title: "Server Moderator",
    description: "AGAMES Official Discord Serverでモデレーターをしています。主に治安維持や、コミュニティでの援助、ルール整備等をしています。",
    link: "https://example.com"
  }
]
