import { useState } from 'react';

export default function Kontakt() {
  // 1. Stanje za unos podataka u formu (Zahtjev 2.3)
  const [formData, setFormData] = useState({
    ime: '',
    email: '',
    predmet: '',
    poruka: ''
  });

  // 2. Stanje za čuvanje inline grešaka (Zahtjev 2.3)
  const [errors, setErrors] = useState({});
  
  // 3. Stanje za uspješno slanje (Toast notifikacija - Zahtjev 2.3)
  const [successMessage, setSuccessMessage] = useState(false);

  // Funkcija koja prati izmjene u poljima i briše greške tokom kucanja
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  // Funkcija za validaciju i slanje forme na json-server backend
  const handleSubmit = (e) => {
    e.preventDefault();
    let lokalneGreske = {};

    // REGEX za validaciju emaila (Strogi zahtjev iz uputa!)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Provjere polja (Klijentska validacija)
    if (!formData.ime.trim()) {
      lokalneGreske.ime = 'Ime je obavezno polje!';
    }
    if (!formData.email.trim()) {
      lokalneGreske.email = 'Email je obavezno polje!';
    } else if (!emailRegex.test(formData.email)) {
      lokalneGreske.email = 'Unesite ispravnu email adresu (npr. ime@test.com)!';
    }
    if (!formData.predmet.trim()) {
      lokalneGreske.predmet = 'Predmet poruke je obavezan!';
    }
    if (!formData.poruka.trim()) {
      lokalneGreske.poruka = 'Poruka ne može biti prazna!';
    }

    // Ako ima grešaka, spasi ih u state i zaustavi slanje
    if (Object.keys(lokalneGreske).length > 0) {
      setErrors(lokalneGreske);
      setSuccessMessage(false);
    } else {
      // AKO JE SVE U REDU -> ŠALJEMO PODATKE NA BACKEND (Zahtjev 2.4 - nema mockova u memoriji)
      fetch('api/poruke', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      .then(res => {
        if (res.ok) {
          setErrors({});
          setSuccessMessage(true);
          
          // Resetujemo formu na ekranu nakon uspješnog slanja
          setFormData({ ime: '', email: '', predmet: '', poruka: '' });
          
          // Sakrij toast poruku nakon 4 sekunde
          setTimeout(() => {
            setSuccessMessage(false);
          }, 4000);
        }
      })
      .catch(err => console.error("Greška pri slanju na backend:", err));
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">Kontaktirajte Nas</h1>
        <p className="text-gray-500 mt-2">Imate pitanja o terenima ili rezervacijama? Naš tim vam stoji na raspolaganju.</p>
      </div>

      {/* TOAST NOTIFIKACIJA ZA USPJEH (Zahtjev 2.3) */}
      {successMessage && (
        <div className="fixed top-20 right-5 bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-xl font-semibold z-50 animate-bounce">
          🚀 Poruka uspješno poslana! Odgovorit ćemo vam uskoro.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white p-6 md:p-10 rounded-2xl shadow-md border border-gray-100">
        
        {/* LIJEVA STRANA: KONTAKT FORMA */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Ime i prezime</label>
            <input
              type="text"
              name="ime"
              value={formData.ime}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.ime ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-emerald-200'}`}
              placeholder="Npr. Kenan Kenanić"
            />
            {/* INLINE ERROR PORUKA (Zahtjev 2.3) */}
            {errors.ime && <p className="text-red-500 text-xs font-medium mt-1">⚠️ {errors.ime}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Email adresa</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-emerald-200'}`}
              placeholder="ime@example.com"
            />
            {errors.email && <p className="text-red-500 text-xs font-medium mt-1">⚠️ {errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Predmet</label>
            <input
              type="text"
              name="predmet"
              value={formData.predmet}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.predmet ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-emerald-200'}`}
              placeholder="Npr. Upit za najam koša"
            />
            {errors.predmet && <p className="text-red-500 text-xs font-medium mt-1">⚠️ {errors.predmet}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Vaša poruka</label>
            <textarea
              name="poruka"
              value={formData.poruka}
              onChange={handleChange}
              rows="4"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.poruka ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-emerald-200'}`}
              placeholder="Napišite detalje ovdje..."
            ></textarea>
            {errors.poruka && <p className="text-red-500 text-xs font-medium mt-1">⚠️ {errors.poruka}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 text-white font-bold py-3 px-6 rounded-lg hover:bg-emerald-600 transition duration-300 shadow-md hover:shadow-lg"
          >
            Pošalji poruku
          </button>
        </form>

        {/* DESNA STRANA: INTERAKTIVNA GOOGLE MAPA (Zahtjev 2.7) */}
        <div className="flex flex-col justify-between h-full">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-slate-800">Naša Lokacija</h3>
            <p className="text-gray-500 text-sm mt-1">Sjedište administracije i glavni sportski uredi.</p>
          </div>
          
          <div className="w-full flex-grow rounded-xl overflow-hidden shadow-inner border border-gray-200 h-72 lg:h-auto min-h-[300px]">
            <iframe
              title="Google Maps - Sportska Lokacija"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2877.170940523555!2d18.375544776632463!3d43.85227743952549!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4758ca20fb144aef%3A0xc3f608a0d95d85c8!2sOtoka%2C%20Sarajevo!5e0!3m2!1shr!2sba!4v1700000000000!5m2!1shr!2sba"
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

      </div>
    </div>
  );
}