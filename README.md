# ⚽ SportBuking - Sistem za rezervaciju sportskih terena

SportBuking je savremena full-stack web aplikacija koja omogućava rekreativcima i sportskim entuzijastima da brzo, jednostavno i bez potrebe za telefonskim pozivima pronađu i rezervišu željene sportske terene (fudbal, košarka, tenis). Sistem posjeduje i napredni administratorski panel za upravljanje rezervacijama i porukama korisnika.

---

## 🚀 Ključne Funkcionalnosti

### 👤 Korisnički dio (Gost / Registrovani korisnik)
* **Pregled i filtriranje arena:** Dinamički prikaz dostupnih terena sa mogućnošću filtriranja prema sportu.
* **Autentikacija i autorizacija:** Registracija novih računa i prijava sa ugrađenom klijentskom validacijom.
* **Pametni sistem rezervacije:** Odabir datuma i satnice uz automatsku provjeru zauzetosti termina na backendu (onemogućeno preklapanje).
* **Kontakt forma:** Slanje upita i poruka administraciji sa integrisanom Google Maps mapom lokacije.

### 👑 Administratorski dio (Admin Panel)
* **Zaštićena admin ruta:** Pristup panelu je strogo zabranjen neautorizovanim korisnicima pomoću `PrivateRoute` zaštite.
* **Pregled rezervacija:** Tabela svih zakazanih termina u realnom vremenu.
* **Upravljanje porukama:** Pregled svih pristiglih pitanja sa kontakt forme.
* **CRUD operacije (Delete):** Mogućnost otkazivanja/brisanja rezervacija i uklanjanja poruka direktno iz baze.

---

## 🛠️ Tehnološki Stack

* **Frontend:** React.js (Vite okruženje)
* **Stilovi i dizajn:** Tailwind CSS (Moderni UI sa Glassmorphism efektima i premium fotografijama)
* **Routing:** React Router DOM (v6)
* **Držanje stanja (State):** React Context API (Globalni `AuthContext` za login status i uloge)
* **Backend / Baza:** JSON-Server (Mock REST API koji simulira stvarnu bazu podataka preko `db.json`)

---

## 💻 Pokretanje Projekta Lokalno

Pratite sljedeće korake kako biste pokrenuli aplikaciju na svom računaru:

### 1. Kloniranje spremišta i instalacija zavisnosti
```bash
# Instalirajte sve potrebne pakete unutar korijenskog foldera
npm install




