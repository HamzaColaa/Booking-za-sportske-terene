# Koristimo istu verziju Node-a
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Otvaramo port 5173 na kojem radi Vite
EXPOSE 5173

# Pokrećemo Vite razvojni server i dodajemo --host da dozvolimo Dockeru da proslijedi port
CMD ["npm", "run", "dev", "--", "--host"]