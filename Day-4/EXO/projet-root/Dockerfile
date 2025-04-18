# Utilise une image officielle Node.js
FROM node:18

# Crée le dossier app dans le conteneur
WORKDIR /app

# Copie les fichiers du projet
COPY package*.json ./
RUN npm install

# Puis copie le reste
COPY . .

# Expose le port
EXPOSE 5000

# Lancer le serveur
CMD ["node", "server.js"]
