import { useState, useEffect } from "react";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const btn = document.getElementById("theme-toggle");
    btn?.addEventListener("click", () => {
      document.documentElement.classList.toggle("dark");
    });
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-slate-900 text-slate-900 dark:text-gray-100 min-h-screen transition-colors duration-300">

      {/* 背景円 */}
      <div className="fixed w-72 h-72 rounded-full bg-blue-500 opacity-10 blur-[60px] top-[15%] left-[-120px] pointer-events-none z-0 animate-floatY"></div>
      <div className="fixed w-72 h-72 rounded-full bg-blue-500 opacity-10 blur-[60px] bottom-[10%] right-[-140px] pointer-events-none z-0 animate-floatY28"></div>

      <main className="relative z-10 max-w-[1100px] mx-auto p-4">

        {/* Hero */}
        <section className="min-h-[70vh] flex flex-col justify-center mb-24">
          <h1 className="text-4xl font-bold mb-4">Hello, I'm Tomo</h1>
          <p className="text-lg">Welcome to my portfolio</p>
        </section>

        {/* Works */}
        <section className="my-24">
          <h2 className="text-2xl mb-6">Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Project 1", "Project 2", "Project 3"].map((project, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl p-6 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition"
                onClick={() => setModalOpen(true)}
              >
                {project}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ダークモード切替ボタン */}
      <button
        id="theme-toggle"
        className="fixed bottom-6 right-6 rounded-full p-3 text-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-gray-100 z-10"
      >
        🌓
      </button>

      {/* モーダル */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-20">
          <div className="bg-white dark:bg-slate-700 text-slate-900 dark:text-gray-100 p-8 rounded-2xl max-w-[90%]">
            <h3 className="text-xl font-bold mb-4">Project Details</h3>
            <p>This is a project description.</p>
            <button
              className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg"
              onClick={() => setModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
