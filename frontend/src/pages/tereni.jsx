import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// 🚀 POMOĆNI BACKUP NIZ DA VERCEL NE BUDE PRAZAN
const BACKUP_TERENI = [
  { id: "1", naziv: 'Zlatni Teren Otoka', sport: 'Fudbal', cijena: 40, lokacija: 'Sarajevo - Otoka', slika: '/images/teren1.jpg' },
  { id: "2", naziv: 'Premium Arena Skenderija', sport: 'Košarka', cijena: 35, lokacija: 'Sarajevo - Centar', slika: '/images/teren2.jpg' },
  { id: "3", naziv: 'Olimpijski Zemljani Teren', sport: 'Tenis', cijena: 25, lokacija: 'Sarajevo - Koševo', slika: '/images/teren3.jpg' },
  { id: "4", naziv: 'Sportski Centar Ilidža', sport: 'Fudbal', cijena: 50, lokacija: 'Sarajevo - Ilidža', slika: '/images/teren4.jpg' },
  { id: "5", naziv: 'Vistafon Park', sport: 'Košarka', cijena: 30, lokacija: 'Sarajevo - Otoka', slika: '/images/teren5.jpg' }
];

export default function Tereni() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Držanje pravih podataka iz db.json u state-u umjesto mockova
  const [tereniIzBaze, setTereniIzBaze] = useState([]);
  const [loading, setLoading] = useState(true);

  const [odabraniSport, setOdabraniSport] = useState('Svi');
  const [terenZaRezervaciju, setTerenZaRezervaciju] = useState(null);
  const [datum, setDatum] = useState('');
  const [vrijeme, setVrijeme] = useState('');
  const [success, setSuccess] = useState(false);
  const [errorPoruka, setErrorPoruka] = useState('');

  // Pametno dohvatanje podataka: Localhost vs Vercel
  useEffect(() => {
    if (window.location.hostname === 'localhost') {
      fetch('http://localhost:5000/tereni')
        .then((res) => res.json())
        .then((data) => {
          setTereniIzBaze(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Greška pri učitavanju terena:', err);
          setTereniIzBaze(BACKUP_TERENI); // Fallback ako json-server nije upaljen lokalno
          setLoading(false);
        });
    } else {
      // Ako smo na Vercelu, odmah ubaci backup da stranica ne bude prazna
      setTereniIzBaze(BACKUP_TERENI);
      setLoading(false);
    }
  }, []);

  // Filtriranje koristi prave podatke povučene iz baze ili backupa
  const filtriraniTereni =
    odabraniSport === 'Svi'
      ? tereniIzBaze
      : tereniIzBaze.filter((t) => t.sport === odabraniSport);

  const pokreniRezervaciju = (teren) => {
    if (!user) {
      alert('Morate biti prijavljeni da biste rezervisali teren!');
      navigate('/prijava');
      return;
    }

    setTerenZaRezervaciju(teren);
    setErrorPoruka('');
  };

  const PotvrdiRezervaciju = (e) => {
    e.preventDefault();
    setErrorPoruka('');

    if (!datum || !vrijeme) {
      setErrorPoruka('Molimo odaberite datum i vrijeme.');
      return;
    }

    // Na Vercelu simuliramo uspješnu rezervaciju jer nemamo pravi API
    if (window.location.hostname !== 'localhost') {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setTerenZaRezervaciju(null);
        setDatum('');
        setVrijeme('');
      }, 2500);
      return;
    }

    // Regularni kod za lokalni json-server
    fetch(
      `http://localhost:5000/rezervacije?terenNaziv=${encodeURIComponent(
        terenZaRezervaciju.naziv
      )}&datum=${datum}&vrijeme=${encodeURIComponent(vrijeme)}`
    )
      .then((res) => res.json())
      .then((postojeceRezervacije) => {
        if (postojeceRezervacije.length > 0) {
          setErrorPoruka(
            '⚠️ Žao nam je, ovaj teren je već rezervisan u tom terminu!'
          );
        } else {
          const novaRezervacija = {
            korisnikEmail: user.email,
            terenNaziv: terenZaRezervaciju.naziv,
            sport: terenZaRezervaciju.sport,
            datum,
            vrijeme,
            ukupnoPlatiti: terenZaRezervaciju.cijena + ' KM'
          };

          fetch('http://localhost:5000/rezervacije', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(novaRezervacija)
          }).then((res) => {
            if (res.ok) {
              setSuccess(true);
              setTimeout(() => {
                setSuccess(false);
                setTerenZaRezervaciju(null);
                setDatum('');
                setVrijeme('');
              }, 2500);
            }
          });
        }
      })
      .catch(() => {
        setErrorPoruka('Greška u komunikaciji sa serverom.');
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="h-14 w-14 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">

      {/* HERO */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-950 p-10 md:p-14 mb-12 text-white">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/20 blur-[140px]" />
        <h1 className="text-4xl md:text-6xl font-black mb-4 relative z-10">
          Rezerviši teren za svoju ekipu
        </h1>
        <p className="text-slate-300 text-lg relative z-10">
          Fudbal • Košarka • Tenis
        </p>

        <div className="grid grid-cols-3 gap-6 mt-10 relative z-10">
          <div>
            <p className="text-3xl font-black">50+</p>
            <p className="text-slate-400">Rezervacija</p>
          </div>
          <div>
            <p className="text-3xl font-black">5</p>
            <p className="text-slate-400">Terena</p>
          </div>
          <div>
            <p className="text-3xl font-black">24/7</p>
            <p className="text-slate-400">Dostupnost</p>
          </div>
        </div>
      </div>

      {/* FILTERI */}
      <div className="flex flex-wrap gap-3 mb-10 justify-center">
        {['Svi', 'Fudbal', 'Košarka', 'Tenis'].map((sport) => (
          <button
            key={sport}
            onClick={() => setOdabraniSport(sport)}
            className={`px-5 py-3 rounded-xl font-bold transition ${
              odabraniSport === sport
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {sport}
          </button>
        ))}
      </div>

      {/* TERENI */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtriraniTereni.map((teren) => (
          <div
            key={teren.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition duration-300"
          >
            <div className="relative h-60 overflow-hidden">
              <img
                src={teren.slika}
                alt={teren.naziv}
                className="w-full h-full object-cover hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {teren.sport}
                </span>
              </div>
            </div>

            <div className="p-6">
              <div className="flex gap-2 mb-4">
                <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-3 py-1 rounded-full">
                  Dostupan
                </span>
                <span className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full">
                  Premium
                </span>
              </div>

              <h3 className="text-2xl font-black text-slate-900">
                {teren.naziv}
              </h3>
              <p className="text-slate-500 mt-2">
                📍 {teren.lokacija}
              </p>

              <div className="bg-slate-50 rounded-2xl p-4 mt-5">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-semibold text-sm">
                    Cijena po satu
                  </span>
                  <span className="text-2xl font-black text-emerald-600">
                    {teren.cijena} KM
                  </span>
                </div>
              </div>

              <button
                onClick={() => pokreniRezervaciju(teren)}
                className="w-full mt-5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold py-3 rounded-xl hover:scale-[1.02] transition"
              >
                Rezerviši Termin
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {terenZaRezervaciju && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-100">
            <h3 className="text-2xl font-black text-slate-900">
              Rezervacija Terena
            </h3>
            <p className="text-slate-500 mt-1 mb-6">
              {terenZaRezervaciju.naziv}
            </p>

            {errorPoruka && (
              <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-sm mb-4">
                {errorPoruka}
              </div>
            )}

            {success ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-xl text-center font-semibold">
                ✅ Termin uspješno rezervisan!
              </div>
            ) : (
              <form onSubmit={PotvrdiRezervaciju} className="space-y-4">
                <input
                  type="date"
                  value={datum}
                  onChange={(e) => setDatum(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-3 border rounded-xl"
                />

                <select
                  value={vrijeme}
                  onChange={(e) => setVrijeme(e.target.value)}
                  className="w-full p-3 border rounded-xl"
                >
                  <option value="">Odaberi termin</option>
                  <option value="09:00 - 10:00">09:00 - 10:00</option>
                  <option value="12:00 - 13:00">12:00 - 13:00</option>
                  <option value="17:00 - 18:00">17:00 - 18:00</option>
                  <option value="20:00 - 21:00">20:00 - 21:00</option>
                </select>

                <div className="bg-slate-50 p-4 rounded-xl">
                  <div className="flex justify-between">
                    <span>Korisnik</span>
                    <span className="font-bold text-xs">
                      {user?.email}
                    </span>
                  </div>
                  <div className="flex justify-between mt-3 pt-3 border-t">
                    <span>Ukupno</span>
                    <span className="font-black text-emerald-600">
                      {terenZaRezervaciju.cijena} KM
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setTerenZaRezervaciju(null)}
                    className="w-1/3 bg-slate-100 py-3 rounded-xl font-bold"
                  >
                    Nazad
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 bg-emerald-600 text-white py-3 rounded-xl font-bold"
                  >
                    Potvrdi Rezervaciju
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}