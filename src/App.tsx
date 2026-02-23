import { useState, useEffect } from 'react';

export default function App() {
  const dataInicio = new Date('2025-03-15T00:00:00'); 
  
  function calcularTempo() {
    const agora = new Date();
    const diferenca = agora.getTime() - dataInicio.getTime(); 
    
    return {
      dias: Math.floor(diferenca / (1000 * 60 * 60 * 24)),
      horas: Math.floor((diferenca / (1000 * 60 * 60)) % 24),
      minutos: Math.floor((diferenca / 1000 / 60) % 60),
    };
  }

  const [tempo, setTempo] = useState(calcularTempo());

  useEffect(() => {
    const timer = setInterval(() => setTempo(calcularTempo()), 60000);
    return () => clearInterval(timer);
  }, []);


  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-b from-slate-950 via-purple-950 to-indigo-950 px-6 py-12 overflow-x-hidden">
      
      <div className="flex flex-col items-center gap-6 text-center mt-10">
        <h1 className="text-white text-3xl font-light tracking-wide leading-relaxed max-w-sm">
          Para a menina mais 
          <span className="block mt-2 text-pink-500 font-serif italic text-5xl drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]">
            linda
          </span>
          do mundo 💘
        </h1>

        <div className="flex gap-4 opacity-80 mt-2">
          <span className="animate-pulse text-2xl">✨</span>
          <span className="animate-bounce text-2xl">💖</span>
          <span className="animate-pulse text-2xl">✨</span>
        </div>
      </div>

      <div className="mt-12 w-full max-w-xs bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
        <p className="text-pink-200/60 text-sm uppercase tracking-widest mb-4">Estamos juntos há</p>
        <div className="flex justify-around text-white">
          <div>
            <span className="block text-3xl font-bold">{tempo.dias}</span>
            <span className="text-xs opacity-50">dias</span>
          </div>
          <div>
            <span className="block text-3xl font-bold">{tempo.horas}</span>
            <span className="text-xs opacity-50">horas</span>
          </div>
          <div>
            <span className="block text-3xl font-bold">{tempo.minutos}</span>
            <span className="text-xs opacity-50">min</span>
          </div>
        </div>
      </div>

      <div className="mt-10 p-6 bg-white/5 border border-white/10 backdrop-blur-lg rounded-3xl shadow-2xl">
        <p className="text-indigo-100 leading-relaxed text-center italic">
          Um ano desde que pude realizar um dos meus maiores sonhos que era ter você ao meu lado, e saiba que desde aquele dia você só me faz ter mais orgulho ainda e me torna a pessoa mais feliz do mundo todos os dias por te ter ao meu lado, eu te amo demais ❤️
        </p>
      </div>

      <footer className="mt-auto pt-10 pb-4">
        <p className="text-pink-500/50 text-xs tracking-tighter uppercase">
          Feito com ❤️ pra você
        </p>
      </footer>

    </div>
  );
}