export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white p-6 md:p-12 font-sans flex flex-col justify-between">
      <header className="max-w-6xl w-full mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-800 pb-8 uppercase">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">
            Truth WireHub
          </h1>
          <p className="text-gray-500 font-mono text-[10px] mt-2 tracking-[0.3em]">
            AUTOMATED DATA ECOSYSTEM
          </p>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 border border-green-900 bg-green-950/20 rounded-full">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-green-400 font-mono text-[10px] tracking-wider">Engine: Running</span>
        </div>
      </header>

      <section className="flex-1 flex items-center justify-center py-20">
        <div className="w-full max-w-2xl p-1 border border-gray-800 rounded-2xl bg-gradient-to-b from-gray-900 to-[#050505] relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,1)]">
          <div className="bg-[#0a0a0a] px-4 py-3 border-b border-gray-800 flex gap-2 items-center rounded-t-xl">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
            <span className="ml-4 text-[10px] text-gray-500 font-mono tracking-widest uppercase italic">system_manifest.v1</span>
          </div>
          <div className="p-8 md:p-12 text-center bg-black/80 rounded-b-xl font-mono">
            <h2 className="text-xl md:text-2xl text-gray-200 mb-6 tracking-widest uppercase">
              Terminal Initializing...
            </h2>
            <p className="text-gray-500 text-[10px] max-w-sm mx-auto mb-10 leading-relaxed uppercase tracking-tighter">
              The Truth WireHub core engine is processing data via local Docker nodes. Public UI restricted.
            </p>
            <div className="flex flex-col gap-3 text-[10px]">
              <div className="px-4 py-3 border border-green-900/40 rounded bg-green-950/5 text-green-500 tracking-widest uppercase text-center">
                [OK] Backend Engine Online
              </div>
              <div className="px-4 py-3 border border-gray-800 rounded bg-[#0a0a0a] text-gray-500 tracking-widest uppercase italic animate-pulse text-center font-bold">
                [WAIT] Dashboard Coming Soon...
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="max-w-6xl w-full mx-auto text-center border-t border-gray-800 pt-8 mt-auto">
        <p className="text-[10px] font-mono text-gray-600 tracking-[0.4em] uppercase font-bold">
          Stack: Next.js • Tailwind • Docker • n8n
        </p>
      </footer>
    </main>
  );
}