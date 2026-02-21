export default function App() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-b from-slate-950 via-purple-950 to-indigo-950 px-6">
      
      <div className="flex flex-col items-center gap-8 text-center">
        
        <h1 className="text-white text-3xl md:text-4xl font-light tracking-wide leading-relaxed max-w-sm">
          Para a menina mais 
          <span className="block mt-2 text-pink-500 font-serif italic text-4xl drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]">
            linda
          </span>
          do mundo 💘
        </h1>

        <div className="flex gap-4 opacity-80">
          <span className="animate-pulse text-2xl">✨</span>
          <span className="animate-bounce text-2xl">💖</span>
          <span className="animate-pulse text-2xl">✨</span>
        </div>

        <div className="animate-bounce text-pink-100 text-2xl">↓</div>

      </div>

    </div>
  )
}