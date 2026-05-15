# 1. Image de base : Node.js 20 sur Alpine Linux
FROM node:20-alpine
# OpenSSL + compat glibc : requis pour Prisma sur Alpine
RUN apk add --no-cache openssl libc6-compat
# 2. Répertoire de travail dans le conteneur
WORKDIR /app
# 3. Copier les fichiers de dépendances EN PREMIER
COPY package.json package-lock.json ./
# 4. Installer les dépendances
RUN npm ci
# 5. Copier le reste du code source
COPY . .
# 6. Générer le client Prisma (URL factice : la vraie URL vient du runtime / Compose)
RUN DATABASE_URL="file:/tmp/build.db" npx prisma generate
# 7. Compiler Next.js pour la production
RUN npm run build
# 8. Déclarer le port utilisé
EXPOSE 3000
# 9. Commande de démarrage
CMD ["npm", "start"]