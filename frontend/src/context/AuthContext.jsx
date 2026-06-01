import { createContext, useState, useEffect, useContext } from 'react';

// Kreiramo Context
const AuthContext = createContext();

// Provider komponenta koja će omotati čitavu aplikaciju
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Čim se aplikacija upali, provjeri ima li spašen korisnik u localStorage
    const savedUser = localStorage.getItem('sportUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Funkcija za prijavu (simulacija provjere uloga Admin / Guest)
  const login = (email, password) => {
    let role = 'Guest';
    
    // Hardkodiramo admina za potrebe demonstracije (npr. vaša imena/mailovi)
    if (email === 'admin@sport.com' && password === 'admin123') {
      role = 'Admin';
    }

    const loggedInUser = { email, role };
    setUser(loggedInUser);
    localStorage.setItem('sportUser', JSON.stringify(loggedInUser));
    return role;
  };

  // Funkcija za odjavu
  const logout = () => {
    setUser(null);
    localStorage.removeItem('sportUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook kako bismo lakše koristili auth u drugim komponentama (Zahtjev 2.5 - Custom hook)
export function useAuth() {
  return useContext(AuthContext);
}