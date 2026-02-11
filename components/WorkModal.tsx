"use client"

export default function WorkModal({ work, onClose }: any) {
  if (!work) return null

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-zinc-900 rounded-2xl p-8 max-w-lg w-full relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-sm opacity-60 hover:opacity-100"
        >
          ✕
        </button>

        <h3 className="text-2xl font-bold mb-4">{work.title}</h3>
        <p className="opacity-70 mb-6">{work.description}</p>

        <a
          href={work.link}
          target="_blank"
          className="text-sky-500 hover:underline"
        >
          View Project →
        </a>
      </div>
    </div>
  )
}
