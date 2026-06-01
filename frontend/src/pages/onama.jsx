export default function ONama() {
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-20 pb-16">
      
      {/* HEADER SECTION */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">Naša Priča</span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-950 tracking-tight">Spajamo sportiste sa idealnim terenima</h1>
        <p className="text-slate-500 font-medium text-lg leading-relaxed">
          SportBuking je nastao iz čiste frustracije – beskonačnih telefonskih poziva, zauzetih linija i neusaglašenih termina. Napravili smo digitalni dom za svakog rekreativca i profesionalca.
        </p>
      </div>

      {/* CORE FEATURES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm hover:shadow-md transition">
          <h3 className="text-2xl font-black text-slate-950 mb-4 flex items-center gap-3">
            <span className="text-3xl bg-emerald-50 p-2 rounded-xl">🎯</span> Naša Misija
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed font-medium">
            Pojednostaviti pristup sportu kroz modernu tehnologiju. Vjerujemo da organizacija utakmice sa prijateljima ili treninga ne bi trebala oduzimati više od jedne minute tvog vremena.
          </p>
        </div>

        <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm hover:shadow-md transition">
          <h3 className="text-2xl font-black text-slate-950 mb-4 flex items-center gap-3">
            <span className="text-3xl bg-blue-50 p-2 rounded-xl">🚀</span> Naša Vizija
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed font-medium">
            Postati vodeća platforma za upravljanje i rezervaciju sportskih objekata u cijeloj regiji, omogućavajući vlasnicima terena pametnu analitiku, a igračima besprijekorno iskustvo.
          </p>
        </div>
      </div>

      {/* WHY CHOOSE US (VALUES) */}
      <div className="space-y-12">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Vrijednosti iza kojih stojimo</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { naslov: 'Apsolutna Transparentnost', opis: 'Cijene koje vidiš su konačne. Nema skrivenih troškova, članarina ili provizija na rezervaciju.', ikona: '💎' },
            { naslov: 'Provjereni Kompleksi', opis: 'Svaki teren na našoj platformi prolazi kroz detaljnu provjeru higijene, rasvjete i kvaliteta podloge.', ikona: '🛡' },
            { naslov: 'Instant Potvrda', opis: 'Nema čekanja na odobrenje vlasnika. Tvoja rezervacija je istog sekunda zaključana u sistemu.', ikona: '⚡' }
          ].map((val, i) => (
            <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
              <div className="text-3xl">{val.ikona}</div>
              <h4 className="text-lg font-bold text-slate-950">{val.naslov}</h4>
              <p className="text-slate-500 text-xs leading-relaxed font-medium">{val.opis}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}