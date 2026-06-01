import { Link } from 'react-router-dom';

export default function Pocetna() {
  return (
    <div className="space-y-24 pb-16">
      
      {/* HERO SECTION WITH GRADIENT BACKGROUND */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-slate-950 overflow-hidden rounded-b-[2.5rem] shadow-2xl mx-2 md:mx-4">
        {/* Pozadinski sjajni elementi */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-[150px]" />
        
        {/* Mreža u pozadini */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40" />

        <div className="relative max-w-5xl mx-auto px-6 text-center space-y-8 z-10">
          <div className="inline-flex items-center gap-2 bg-slate-900/80 border border-slate-800 px-4 py-2 rounded-full text-xs font-semibold tracking-wide text-emerald-400 backdrop-blur-md animate-fade-in">
            🔥 Nova era rezervacije sportskih termina
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.1]">
            Rezerviši svoj teren <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500">
              bez čekanja i poziva.
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-base sm:text-xl text-slate-400 font-medium leading-relaxed">
            Pronađi vrhunske sportske komplekse u tvom gradu. Biraj vrijeme, plati sigurno online i osiguraj svoj termin za fudbal, košarku ili tenis u samo tri klika.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link 
              to="/tereni" 
              className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-slate-950 font-extrabold px-8 py-4 rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_35px_rgba(16,185,129,0.5)] transition duration-300 text-center transform hover:-translate-y-0.5"
            >
              Istraži Terene ⚽
            </Link>
            <Link 
              to="/kontakt" 
              className="w-full sm:w-auto bg-slate-900/60 hover:bg-slate-950 border border-slate-800 text-slate-300 hover:text-white font-bold px-8 py-4 rounded-xl backdrop-blur-md transition duration-300 text-center"
            >
              Podrška i Lokacija
            </Link>
          </div>
        </div>
      </section>

      {/* STATS SECTION (MODERN GLASSMORPHISM) */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 bg-white border border-slate-100 p-8 rounded-3xl shadow-xl shadow-slate-100/50">
          {[
            { broj: '15+', tekst: 'Premium Terena' },
            { broj: '12,000+', tekst: 'Odigranih Termina' },
            { broj: '99.4%', tekst: 'Zadovoljnih Korisnika' },
            { broj: '24/7', tekst: 'Online Podrška' }
          ].map((stat, idx) => (
            <div key={idx} className="text-center space-y-1">
              <div className="text-3xl md:text-5xl font-black bg-gradient-to-br from-slate-900 to-slate-700 bg-clip-text text-transparent">{stat.broj}</div>
              <div className="text-xs md:text-sm font-semibold text-slate-400 uppercase tracking-wider">{stat.tekst}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SPORT CATEGORIES WITH HIGH-TECH CARDS */}
      <section className="max-w-6xl mx-auto px-4 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Izaberi svoj sport</h2>
          <p className="text-slate-500 font-medium">Svi tereni su opremljeni profesionalnom podlogom, rasvjetom i pratećom opremom.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { sport: 'Fudbal', emoji: '⚽', opis: 'Vještačka trava najnovije generacije, profesionalni golovi i svlačionice sa tuševima.', klasa: 'from-emerald-500/20 to-teal-500/5 text-emerald-600' },
            { sport: 'Košarka', emoji: '🏀', opis: 'Zatvorene dvorane i vanjski tereni sa zglobnim obručima i certificiranom parket podlogom.', klasa: 'from-orange-500/20 to-amber-500/5 text-orange-600' },
            { sport: 'Tenis', emoji: '🎾', opis: 'Zemljani i tvrdi tereni idealni za singl ili dubl mečeve, uz mogućnost najma rekvizita.', klasa: 'from-blue-500/20 to-indigo-500/5 text-blue-600' }
          ].map((kat, index) => (
            <div key={index} className="group relative bg-white border border-slate-100 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${kat.klasa} rounded-bl-full opacity-40 group-hover:scale-110 transition duration-300`} />
              <div className="relative space-y-6">
                <div className="text-5xl bg-slate-50 w-20 h-20 flex items-center justify-center rounded-2xl shadow-inner group-hover:scale-110 transition duration-300">{kat.emoji}</div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-extrabold text-slate-950">{kat.sport}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">{kat.opis}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PREMIUM CALL TO ACTION */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="relative bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 rounded-[2.5rem] p-8 md:p-16 text-center overflow-hidden shadow-2xl">
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px]" />
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px]" />
          
          <div className="relative max-w-xl mx-auto space-y-6 z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">Spreman za utakmicu?</h2>
            <p className="text-slate-400 font-medium text-sm md:text-base">Registruj se besplatno, okupi ekipu i osiguraj željeni termin prije nego što ga neko drugi zauzme.</p>
            <div className="pt-4">
              <Link 
                to="/registracija" 
                className="inline-block bg-white hover:bg-slate-100 text-slate-950 font-black px-8 py-4 rounded-xl shadow-lg transition duration-200 transform hover:-translate-y-0.5"
              >
                Kreiraj Račun Besplatno
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}