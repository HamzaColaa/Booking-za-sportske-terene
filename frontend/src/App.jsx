import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { AuthProvider, useAuth } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

import Pocetna from './pages/pocetna';
import Tereni from './pages/tereni';
import ONama from './pages/onama';
import Prijava from './pages/prijava';
import Registracija from './pages/registracija';
import Kontakt from './pages/kontakt';
import AdminPanel from './pages/adminpanel';
import NotFound from './pages/notfound';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [mobileMenu, setMobileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav
      className="
      sticky
      top-0
      z-50
      bg-white/80
      backdrop-blur-md
      border-b
      border-slate-200
      shadow-sm
    "
    >
      <div className="max-w-7xl mx-auto px-4">

        <div className="h-20 flex items-center justify-between">

          <Link
            to="/"
            className="
            text-2xl
            font-black
            text-slate-900
            tracking-tight
          "
          >
            ⚽ SportBuking
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-6">

            <Link
              to="/"
              className="font-semibold text-slate-600 hover:text-emerald-600 transition"
            >
              Početna
            </Link>

            <Link
              to="/tereni"
              className="font-semibold text-slate-600 hover:text-emerald-600 transition"
            >
              Tereni
            </Link>

            <Link
              to="/o-nama"
              className="font-semibold text-slate-600 hover:text-emerald-600 transition"
            >
              O nama
            </Link>

            <Link
              to="/kontakt"
              className="font-semibold text-slate-600 hover:text-emerald-600 transition"
            >
              Kontakt
            </Link>

            {user?.role === 'Admin' && (
              <Link
                to="/admin"
                className="
                bg-red-50
                text-red-600
                px-4
                py-2
                rounded-xl
                font-bold
              "
              >
                Admin Panel
              </Link>
            )}

            {user ? (
              <div className="flex items-center gap-3">

                <div
                  className="
                  bg-slate-100
                  px-4
                  py-2
                  rounded-xl
                  text-xs
                  font-semibold
                  text-slate-600
                "
                >
                  {user.email}
                </div>

                <button
                  onClick={handleLogout}
                  className="
                  bg-slate-900
                  text-white
                  px-4
                  py-2
                  rounded-xl
                  font-bold
                  hover:bg-slate-800
                  transition
                "
                >
                  Odjava
                </button>

              </div>
            ) : (
              <div className="flex items-center gap-3">

                <Link
                  to="/prijava"
                  className="
                  text-slate-600
                  font-semibold
                  hover:text-emerald-600
                "
                >
                  Prijava
                </Link>

                <Link
                  to="/registracija"
                  className="
                  bg-gradient-to-r
                  from-emerald-500
                  to-emerald-600
                  text-white
                  px-5
                  py-2.5
                  rounded-xl
                  font-bold
                  shadow-lg
                "
                >
                  Registracija
                </Link>

              </div>
            )}

          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="
            md:hidden
            text-3xl
            font-bold
            text-slate-800
          "
          >
            ☰
          </button>

        </div>

        {/* MOBILE MENU */}
        {mobileMenu && (
          <div
            className="
            md:hidden
            border-t
            border-slate-200
            py-4
            space-y-3
          "
          >

            <Link
              to="/"
              className="block font-semibold text-slate-700"
            >
              Početna
            </Link>

            <Link
              to="/tereni"
              className="block font-semibold text-slate-700"
            >
              Tereni
            </Link>

            <Link
              to="/o-nama"
              className="block font-semibold text-slate-700"
            >
              O nama
            </Link>

            <Link
              to="/kontakt"
              className="block font-semibold text-slate-700"
            >
              Kontakt
            </Link>

            {user?.role === 'Admin' && (
              <Link
                to="/admin"
                className="block text-red-600 font-bold"
              >
                Admin Panel
              </Link>
            )}

            {user ? (
              <>
                <div className="text-xs text-slate-500">
                  {user.email}
                </div>

                <button
                  onClick={handleLogout}
                  className="
                  w-full
                  bg-slate-900
                  text-white
                  py-3
                  rounded-xl
                  font-bold
                "
                >
                  Odjava
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-3">

                <Link
                  to="/prijava"
                  className="
                  text-center
                  py-3
                  rounded-xl
                  border
                  border-slate-200
                "
                >
                  Prijava
                </Link>

                <Link
                  to="/registracija"
                  className="
                  text-center
                  py-3
                  rounded-xl
                  bg-emerald-600
                  text-white
                  font-bold
                "
                >
                  Registracija
                </Link>

              </div>
            )}

          </div>
        )}

      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-200 bg-white">

      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid md:grid-cols-3 gap-10">

          <div>
            <h3 className="text-2xl font-black text-slate-900">
              ⚽ SportBuking
            </h3>

            <p className="text-slate-500 mt-3">
              Moderna platforma za rezervaciju sportskih terena.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-3">
              Navigacija
            </h4>

            <div className="space-y-2 text-slate-500">
              <p>Početna</p>
              <p>Tereni</p>
              <p>O nama</p>
              <p>Kontakt</p>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-3">
              Kontakt
            </h4>

            <div className="space-y-2 text-slate-500">
              <p>Sarajevo, BiH</p>
              <p>info@sportbuking.ba</p>
              <p>+387 XX XXX XXX</p>
            </div>
          </div>

        </div>

        <div className="border-t border-slate-200 mt-10 pt-6 text-center text-slate-400 text-sm">
          © 2026 SportBuking. Sva prava zadržana.
        </div>

      </div>

    </footer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>

        <div
          className="
          min-h-screen
          bg-gradient-to-b
          from-slate-50
          via-white
          to-slate-100
          text-slate-800
        "
        >

          <Navbar />

          <main className="py-6">
            <Routes>

              <Route path="/" element={<Pocetna />} />

              <Route
                path="/tereni"
                element={<Tereni />}
              />

              <Route
                path="/o-nama"
                element={<ONama />}
              />

              <Route
                path="/prijava"
                element={<Prijava />}
              />

              <Route
                path="/registracija"
                element={<Registracija />}
              />

              <Route
                path="/kontakt"
                element={<Kontakt />}
              />

              <Route
                path="/admin"
                element={
                  <PrivateRoute>
                    <AdminPanel />
                  </PrivateRoute>
                }
              />

              <Route
                path="*"
                element={<NotFound />}
              />

            </Routes>
          </main>

          <Footer />

        </div>

      </Router>
    </AuthProvider>
  );
}