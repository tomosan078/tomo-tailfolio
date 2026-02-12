"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import WorkModal from "../components/WorkModal"
import { works } from "../lib/works"

export default function Home() {
  const [dark, setDark] = useState(false)
  const [selectedWork, setSelectedWork] = useState<any>(null)
  const [discord, setDiscord] = useState<any>(null)
  const [openDetail, setOpenDetail] = useState(false)
  const [progress, setProgress] = useState(0)

  const discordId = "1363485593304170510"

  // ===== Dark Mode =====
  useEffect(() => {
    const html = document.documentElement
    dark ? html.classList.add("dark") : html.classList.remove("dark")
  }, [dark])

  // ===== Discord Lanyard Socket =====
  useEffect(() => {
    const socket = new WebSocket("wss://api.lanyard.rest/socket")

    socket.onopen = () => {
      socket.send(JSON.stringify({
        op: 2,
        d: { subscribe_to_id: discordId }
      }))
    }

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if ((data.t === "INIT_STATE" || data.t === "PRESENCE_UPDATE") && data.d?.discord_user) {
        setDiscord(data.d)
      }
    }

    return () => socket.close()
  }, [])

  const status = discord?.discord_status ?? "offline"
  const spotify = discord?.spotify

  // ===== Spotify Progress =====
  useEffect(() => {
    if (!spotify?.timestamps?.start) return

    const interval = setInterval(() => {
      const now = Date.now()
      const elapsed = Math.floor((now - spotify.timestamps.start) / 1000)
      setProgress(elapsed)
    }, 500)

    return () => clearInterval(interval)
  }, [spotify])

  const format = (sec:number) => {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${m}:${s.toString().padStart(2,"0")}`
  }

  // ===== Avatar =====
  const avatarUrl =
    discord?.discord_user?.id && discord?.discord_user?.avatar
      ? `https://cdn.discordapp.com/avatars/${discord.discord_user.id}/${discord.discord_user.avatar}.png?size=256`
      : null

  return (
    <main className="min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors overflow-x-hidden">

      {/* Dark Toggle */}
      <button
        onClick={() => setDark(!dark)}
        className="fixed top-4 right-4 z-50 px-4 py-2 rounded-full text-sm font-medium bg-black text-white dark:bg-white dark:text-black transition"
      >
        {dark ? "☀ Light" : "🌙 Dark"}
      </button>

      {/* ===== Online Bar ===== */}
      <div className="fixed top-0 left-0 w-full z-40 flex justify-center pt-4">
        <div
          onClick={() => setOpenDetail(!openDetail)}
          className="cursor-pointer flex items-center gap-3 px-6 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 shadow-lg backdrop-blur transition hover:scale-105"
        >
          <span
            className={`w-3 h-3 rounded-full animate-pulse ${
              status === "online"
                ? "bg-green-500"
                : status === "idle"
                ? "bg-yellow-400"
                : status === "dnd"
                ? "bg-red-500"
                : "bg-gray-400"
            }`}
          />
          <span className="text-sm font-medium capitalize">
            {status}
          </span>
        </div>
      </div>

      {/* ===== Detail Card ===== */}
      {openDetail && discord && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 bg-white dark:bg-zinc-900 shadow-2xl rounded-2xl p-6 w-80 z-50">

          {/* Avatar */}
          <div className="flex items-center gap-4 mb-4">
            {avatarUrl && (
              <Image
                src={avatarUrl}
                alt="Discord Avatar"
                width={64}
                height={64}
                className="rounded-full"
              />
            )}
            <div>
              <div className="font-semibold">
                {discord.discord_user?.username}
              </div>
              <div className="text-sm opacity-60 capitalize">
                {status}
              </div>
            </div>
          </div>

          {/* Spotify */}
          {spotify && (
            <div className="bg-zinc-100 dark:bg-zinc-800 rounded-xl p-4 flex gap-4 items-center">

              <Image
                src={spotify.album_art_url}
                alt="Album Art"
                width={72}
                height={72}
                className="rounded-lg shadow-lg"
              />

              <div className="flex-1">

                <div className="font-semibold text-sm">
                  {spotify.song}
                </div>

                <div className="text-xs opacity-60">
                  {spotify.artist}
                </div>

                {/* Progress */}
                <div className="mt-3">
                  <div className="w-full h-2 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 transition-all duration-500 ease-linear"
                      style={{
                        width:`${(progress/(spotify.duration/1000))*100}%`
                      }}
                    />
                  </div>

                  <div className="flex justify-between text-[10px] opacity-50 mt-1">
                    <span>{format(progress)}</span>
                    <span>{format(Math.floor(spotify.duration/1000))}</span>
                  </div>
                </div>

                {/* Visualizer */}
                <div className="flex gap-[3px] mt-3 h-4 items-end">
                  {[...Array(16)].map((_,i)=>(
                    <div
                      key={i}
                      className="w-[3px] bg-green-500 animate-pulse"
                      style={{
                        height:`${8 + Math.sin(progress*2+i)*6}px`,
                        animationDelay:`${i*0.1}s`
                      }}
                    />
                  ))}
                </div>

              </div>
            </div>
          )}

        </div>
      )}

      {/* ===== Hero ===== */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-32">
        {avatarUrl && (
          <Image
            src={avatarUrl}
            alt="Avatar"
            width={140}
            height={140}
            className="rounded-full border-4 border-sky-400 shadow-xl mb-6 hover:scale-105 transition"
          />
        )}

        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Hi, I'm <span className="text-sky-500">tomosan078</span>
        </h1>

        <p className="text-lg md:text-xl opacity-70">
          Students / Server Moderator
        </p>
      </section>

      {/* ===== Ticker ===== */}
      <div className="w-full overflow-hidden border-y border-zinc-200 dark:border-zinc-800 mt-24">
        <div className="flex animate-ticker w-max">

          {[0,1].map(i=>(
            <div key={i} className="flex whitespace-nowrap py-3 text-sm font-medium">
              <span className="mx-8">
                ● STATUS: {status.toUpperCase()} ● DISCORD CONNECTED ● NEXT.JS ● TAILWIND ● PORTFOLIO ● UI DESIGN ● FRONTEND ●
              </span>
              <span className="mx-8">
                ● STATUS: {status.toUpperCase()} ● DISCORD CONNECTED ● NEXT.JS ● TAILWIND ● PORTFOLIO ● UI DESIGN ● FRONTEND ●
              </span>
            </div>
          ))}

        </div>
      </div>

      {/* ===== Work ===== */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Work</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {works.map((work:any) => (
            <div
              key={work.id}
              onClick={() => setSelectedWork(work)}
              className="p-6 rounded-2xl bg-white dark:bg-zinc-800 shadow-lg hover:scale-105 hover:shadow-2xl transition cursor-pointer"
            >
              <h3 className="text-xl font-semibold mb-2">
                {work.title}
              </h3>
              <p className="opacity-60">
                {work.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <WorkModal
        work={selectedWork}
        onClose={() => setSelectedWork(null)}
      />

    </main>
  )
}
