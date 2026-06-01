import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  // Dok se provjerava localStorage, prikaži kratki loading tekst ili spinner
  if (loading) return <div className="p-8 text-center font-bold">Provjera pristupa...</div>;

  // Ako korisnik nije prijavljen ILI nije 'Admin', preusmjeri ga na stranicu za prijavu
  if (!user || user.role !== 'Admin') {
    return <Navigate to="/prijava" replace />;
  }

  // Ako jeste Admin, pusti ga da vidi stranicu (AdminPanel)
  return children;
}