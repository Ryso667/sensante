# Plan d'implémentation \- Authentification (Lab Auth)

## Objectif

Sécuriser l'application SénSanté en mettant en place un système d'authentification complet : inscription, connexion, gestion des sessions et protection des routes par rôles 1, 5\.

## 1\. Préparation et Installation

* **Installation des dépendances** : Installer next-auth pour la gestion des sessions et bcrypt pour le hachage sécurisé des mots de passe 3\.  
* **Variables d'environnement** : Configurer le fichier .env avec NEXTAUTH\_SECRET (généré via openssl) et NEXTAUTH\_URL 6\.

## 2\. Configuration Technique (NextAuth.js)

* **Fichier de configuration** : Créer src/lib/auth.ts en utilisant le CredentialsProvider pour une authentification email/mot de passe 7, 8\.  
* **Route API d'authentification** : Mettre en place la route dynamique src/app/api/auth/\[...nextauth\]/route.ts pour gérer les requêtes de connexion et déconnexion 9\.  
* **Gestion des Rôles** : Configurer les *callbacks* JWT et session pour propager le rôle de l'utilisateur (AGENT, MEDECIN, ADMIN) dans toute l'application 8, 9\.

## 3\. Inscription des Utilisateurs

* **API d'inscription** : Créer src/app/api/register/route.ts 10\.  
* **Sécurité des mots de passe** : Implémenter le hachage systématique des mots de passe avec bcrypt avant l'enregistrement en base de données (ne jamais stocker en clair) 11, 12\.

## 4\. Interface Utilisateur (UI)

* **Pages d'accès** : Créer les formulaires interactifs pour la connexion (/login) et l'inscription (/register) 13, 14\.  
* **Contexte de session** : Envelopper l'application dans un SessionProvider via un composant SessionWrapper pour permettre l'accès aux données utilisateur partout dans l'interface 15, 16\.  
* **Header dynamique** : Modifier le Header pour afficher le nom de l'utilisateur connecté et un bouton de déconnexion 17, 18\.

## 5\. Protection de l'Application

* **Protection des pages (Client)** : Rediriger automatiquement les utilisateurs non connectés vers la page de login pour les sections protégées (/patients, /consultations, /dashboard) 17, 19\.  
* **Protection des API (Serveur)** : Utiliser getServerSession dans les routes API pour bloquer les accès non autorisés (statut 401\) 20\.

## Rôles à gérer

Rôle,Permissions prévues  
AGENT,"Créer des patients, voir ses consultations 21."  
MEDECIN,"Valider les diagnostics, voir tous les patients 21."  
ADMIN,"Gérer les utilisateurs, accès au dashboard 21."  
**Rappel pour le commit** :Une fois ce fichier créé dans le dossier docs, n'oublie pas d'exécuter les commandes suivantes pour valider ta tâche du jour :  
git add docs/plan-auth.md  
git commit \-m "Docs: Plan de préparation pour le Lab Auth (Le Bouclier)"  
git push  
