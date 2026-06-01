import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Prijava() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Molimo popunite sva polja.');
      return;
    }

    if (email === 'admin@sport.com' && password === 'admin123') {
      login(email, password);
      navigate('/admin');
      return;
    }

    fetch(`/api/korisnici?email=${email}&password=${password}`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          login(data[0].email, password); 
          navigate('/');
        } else {
          setError('Pogrešan email ili lozinka.');
        }
      })
      .catch(err => {
        console.error(err);
        setError('Server je nedostupan.');
      });
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-2xl shadow-md border border-gray-100">
      <h2 className="text-3xl font-bold text-center text-slate-900 mb-2">Prijava</h2>
      <p className="text-xs text-center text-gray-400 mb-6">Admin: admin@sport.com / admin123</p>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm font-medium mb-4">⚠️ {error}</div>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Email adresa</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-200" placeholder="ime@example.com" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Lozinka</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-200" placeholder="******" />
        </div>
        <button type="submit" className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-bold py-3 rounded-lg transition duration-200 shadow-md">Prijavi se</button>
      </form>
      <p className="text-sm text-center text-gray-500 mt-5">Nemate račun? <Link to="/registracija" className="text-emerald-600 font-semibold hover:underline">Registrujte se</Link></p>
    </div>
  );
}