import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AdminPanel() {
  const { user } = useAuth();
  const [poruke, setPoruke] = useState([]);
  const [rezervacije, setRezervacije] = useState([]);
  const [loading, setLoading] = useState(true);

  // Učitavanje i poruka i rezervacija sa JSON-Servera
  useEffect(() => {
    Promise.all([
      fetch('http://localhost:5000/poruke').then(res => res.json()),
      fetch('http://localhost:5000/rezervacije').then(res => res.json())
    ])
    .then(([podaciPoruke, podaciRezervacije]) => {
      setPoruke(podaciPoruke);
      setRezervacije(podaciRezervacije);
      setLoading(false);
    })
    .catch(err => {
      console.error('Greška pri učitavanju admin podataka:', err);
      setLoading(false);
    });
  }, []);

  // Funkcija za brisanje poruke
  const obrisiPoruku = (id) => {
    if (window.confirm('Da li ste sigurni da želite obrisati ovu poruku?')) {
      fetch(`http://localhost:5000/poruke/${id}`, { method: 'DELETE' })
        .then(res => {
          if (res.ok) setPoruke(poruke.filter(p => p.id !== id));
        });
    }
  };

  // Funkcija za otkazivanje/brisanje rezervacije (CRUD - Delete)
  const otkaziRezervaciju = (id) => {
    if (window.confirm('Da li ste sigurni da želite otkazati i obrisati ovu rezervaciju?')) {
      fetch(`http://localhost:5000/rezervacije/${id}`, { method: 'DELETE' })
        .then(res => {
          if (res.ok) setRezervacije(rezervacije.filter(r => r.id !== id));
        });
    }
  };

  if (loading) {
    return <div className="p-8 text-center font-bold text-lg text-slate-600">Učitavanje podataka za Admin Panel...</div>;
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-12">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-950">👑 Admin Panel</h1>
        <p className="text-gray-500 text-sm mt-1">Dobrodošli nazad, <span className="font-mono font-bold text-slate-700">{user?.email}</span>. Upravljajte porukama i rezervacijama termina.</p>
      </div>

      {/* TABELA 1: SVE REZERVACIJE (Novo!) */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Aktivne Rezervacije Terena</h2>
            <p className="text-slate-400 text-xs mt-0.5">Pregled svih zakazanih termina upisanih u bazu podataka.</p>
          </div>
          <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">
            Ukupno: {rezervacije.length}
          </span>
        </div>

        {rezervacije.length === 0 ? (
          <p className="p-8 text-center text-gray-400 text-sm">Trenutno nema nijedne rezervisane stavke u bazi.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-gray-100 text-xs font-bold uppercase tracking-wider text-gray-500">
                  <th className="p-4">Korisnik</th>
                  <th className="p-4">Teren / Sport</th>
                  <th className="p-4">Datum i Vrijeme</th>
                  <th className="p-4">Cijena</th>
                  <th className="p-4 text-center">Akcija</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-slate-700">
                {rezervacije.map((rez) => (
                  <tr key={rez.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-4 font-medium font-mono text-xs">{rez.korisnikEmail}</td>
                    <td className="p-4">
                      <div className="font-bold text-slate-900">{rez.terenNaziv}</div>
                      <div className="text-xs text-gray-400">{rez.sport}</div>
                    </td>
                    <td className="p-4 font-medium">
                      📅 {rez.datum} <span className="text-gray-400 mx-1">|</span> ⏰ {rez.vrijeme}
                    </td>
                    <td className="p-4 font-extrabold text-emerald-600">{rez.ukupnoPlatiti}</td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => otkaziRezervaciju(rez.id)}
                        className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-lg text-xs font-bold transition duration-150"
                      >
                        Otkaži
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* TABELA 2: PORUKE IZ KONTAKT FORME */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Poruke Korisnika</h2>
            <p className="text-slate-400 text-xs mt-0.5">Pristigla pitanja i zahtjevi poslani kroz kontakt formu.</p>
          </div>
          <span className="bg-blue-500/20 text-blue-400 text-xs font-bold px-3 py-1 rounded-full border border-blue-500/30">
            Ukupno: {poruke.length}
          </span>
        </div>

        {poruke.length === 0 ? (
          <p className="p-8 text-center text-gray-400 text-sm">Trenutno nema pristiglih poruka.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-gray-100 text-xs font-bold uppercase tracking-wider text-gray-500">
                  <th className="p-4">Ime i Email</th>
                  <th className="p-4">Poruka</th>
                  <th className="p-4 text-center">Akcija</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-slate-700">
                {poruke.map((por) => (
                  <tr key={por.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-4 w-1/4">
                      <div className="font-bold text-slate-900">{por.ime || por.name}</div>
                      <div className="text-xs font-mono text-gray-400">{por.email}</div>
                    </td>
                    <td className="p-4 text-gray-600 italic">"{por.poruka || por.message}"</td>
                    <td className="p-4 text-center w-24">
                      <button
                        onClick={() => obrisiPoruku(por.id)}
                        className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-lg text-xs font-bold transition duration-150"
                      >
                        Briši
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}