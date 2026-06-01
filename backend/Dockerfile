# Koristimo laganu verziju Node-a
FROM node:18-alpine

# Postavljamo radni direktorij unutar kontejnera
WORKDIR /app

# Kopiramo package.json i instaliramo zavisnosti
COPY package*.json ./
RUN npm install

# Kopiramo ostatak koda (db.json itd.)
COPY . .

# Otvaramo port 5000 na kojem radi json-server
EXPOSE 5000

# Pokrećemo json-server i obavezno dodajemo --host 0.0.0.0 da bude dostupan van kontejnera
CMD ["npx", "json-server", "--watch", "db.json", "--port", "5000", "--host", "0.0.0.0"]