import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Registracija() {
  const [formData, setFormData] = useState({ ime: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let lokalneGreske = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.ime.trim()) lokalneGreske.ime = 'Ime je obavezno.';
    if (!formData.email.trim()) {
      lokalneGreske.email = 'Email je obavezan.';
    } else if (!emailRegex.test(formData.email)) {
      lokalneGreske.email = 'Unesite ispravan email format.';
    }
    if (formData.password.length < 6) lokalneGreske.password = 'Lozinka mora imati najmanje 6 znakova.';
    if (formData.password !== formData.confirmPassword) {
      lokalneGreske.confirmPassword = 'Lozinke se ne podudaraju!';
    }

    if (Object.keys(lokalneGreske).length > 0) {
      setErrors(lokalneGreske);
    } else {
      const noviKorisnik = {
        ime: formData.ime,
        email: formData.email,
        password: formData.password,
        role: 'Guest' 
      };

      fetch('/api /korisnici', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noviKorisnik)
      })
      .then(res => {
        if (res.ok) {
          setSuccess(true);
          setTimeout(() => {
            navigate('/prijava');
          }, 2000);
        }
      })
      .catch(err => console.error("Greška pri registraciji:", err));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-2xl shadow-md border border-gray-100">
      <h2 className="text-3xl font-bold text-center text-slate-900 mb-6">Registracija</h2>
      
      {success && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-lg text-center font-medium mb-4">
          🎉 Registracija uspješna! Preusmjeravanje na prijavu...
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Ime i prezime</label>
          <input type="text" name="ime" value={formData.ime} onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-200" placeholder="Hamza Čolaković" />
          {errors.ime && <p className="text-red-500 text-xs mt-1">⚠️ {errors.ime}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Email adresa</label>
          <input type="text" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-200" placeholder="ime@mail.com" />
          {errors.email && <p className="text-red-500 text-xs mt-1">⚠️ {errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Lozinka</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-200" placeholder="******" />
          {errors.password && <p className="text-red-500 text-xs mt-1">⚠️ {errors.password}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Potvrdite Lozinku</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-200" placeholder="******" />
          {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">⚠️ {errors.confirmPassword}</p>}
        </div>
        <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg transition duration-200 shadow-md">Registruj se</button>
      </form>
      <p className="text-sm text-center text-gray-500 mt-4">Već imate račun? <Link to="/prijava" className="text-emerald-600 font-semibold hover:underline">Prijavite se</Link></p>
    </div>
  );
}