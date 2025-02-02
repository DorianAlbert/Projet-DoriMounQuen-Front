# Projet DoriMounQuen - Frontend

Bienvenue sur le frontend du projet DoriMounQuen, développé dans le cadre de la formation web Full Stack Ynov.

## Description

Cette application frontend est construite avec React, TypeScript et Vite. Elle vise à fournir une interface utilisateur réactive et moderne pour notre projet.

## Fonctionnalités

- **React** pour une interface utilisateur dynamique.
- **TypeScript** pour une meilleure gestion des types et une maintenance facilitée.
- **Vite** pour un bundling rapide et efficace.
- **ESLint** et **Prettier** pour assurer la qualité et la cohérence du code.

## Prérequis

Avant de commencer, assure-toi d'avoir installé :

- [Node.js](https://nodejs.org/) (version 14 ou supérieure)
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)

## Installation

1. Clone le dépôt :

   ```bash
   git clone https://github.com/DorianAlbert/Projet-DoriMounQuen-Front.git
   cd Projet-DoriMounQuen-Front
   ```

2. Installe les dépendances :

   ```bash
   npm install
   ```

   ou

   ```bash
   yarn install
   ```

## Démarrage

Pour lancer l'application en mode développement :

```bash
npm run dev
```

ou

```bash
yarn dev
```

L'application sera accessible à l'adresse [http://localhost:3000](http://localhost:3000).

## Scripts

- `dev` : démarre l'application en mode développement.
- `build` : construit l'application pour la production.
- `lint` : analyse le code pour détecter les problèmes de style et de syntaxe.

## Structure du projet

```bash
Projet-DoriMounQuen-Front/
├── public/             # Fichiers statiques
├── src/                # Code source de l'application
│   ├── components/     # Composants React
│   ├── assets/         # Ressources (images, styles, etc.)
│   ├── App.tsx         # Composant principal
│   └── main.tsx        # Point d'entrée de l'application
├── .gitignore          # Fichiers à ignorer par Git
├── package.json        # Informations sur le projet et dépendances
├── tsconfig.json       # Configuration TypeScript
├── vite.config.ts      # Configuration Vite
└── README.md           # Ce fichier
```

## Contribution

Les contributions sont les bienvenues ! N'hésite pas à ouvrir une issue ou une pull request si tu as des suggestions ou des améliorations.

## Licence

Ce projet est sous licence MIT.
