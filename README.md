# 🍽️ TP Restaurant — API Backend

API REST pour la gestion de restaurants, menus et catégories.  
Architecture N-tiers modulaire avec Node.js, TypeScript et SQLite.

## 🏗️ Architecture
backend/src/
├── config/         ← configuration (isMock)
├── db/             ← connexion SQLite + seed
└── modules/
├── restaurant/ ← module restaurant
│   ├── controllers/
│   ├── mocks/
│   ├── repositories/
│   │   ├── IRestaurantRepository.ts      (contrat)
│   │   ├── InMemoryRestaurantRepository.ts (mock)
│   │   └── SqlRestaurantRepository.ts    (SQL)
│   ├── schema/
│   ├── services/
│   ├── tests/
│   └── types/
├── menu/       ← même structure
└── categorie/  ← même structure
## 🚀 Installation

```bash
cd backend
npm install
```

## ▶️ Lancer le serveur

```bash
npm run dev
```

## 🗄️ Remplir la base de données

```bash
npm run seed
```

## 🧪 Lancer les tests

```bash
npm test
```

## 🔀 Basculer entre Mock et SQL

Dans le fichier `.env` :

```env
DATA_SOURCE=mock   # données en mémoire
DATA_SOURCE=sql    # vraie base SQLite
```

## 📡 Routes API

### Restaurants
| Méthode | Route | Description |
|---------|-------|-------------|
| GET | /restaurants | Liste tous les restaurants |
| GET | /restaurants/:id | Récupère un restaurant |
| POST | /restaurants | Crée un restaurant |
| PUT | /restaurants/:id | Modifie un restaurant |
| DELETE | /restaurants/:id | Supprime un restaurant |

### Menus
| Méthode | Route | Description |
|---------|-------|-------------|
| GET | /menus | Liste tous les menus |
| GET | /menus/:id | Récupère un menu |
| GET | /menus/resto/:id | Menus d'un restaurant |
| POST | /menus | Crée un menu |
| PUT | /menus/:id | Modifie un menu |
| DELETE | /menus/:id | Supprime un menu |

### Catégories
| Méthode | Route | Description |
|---------|-------|-------------|
| GET | /categories | Liste toutes les catégories |
| GET | /categories/:id | Récupère une catégorie |
| POST | /categories | Crée une catégorie |
| PUT | /categories/:id | Modifie une catégorie |
| DELETE | /categories/:id | Supprime une catégorie |

## 🛠️ Technologies

- **Node.js** + **TypeScript**
- **Express** — framework HTTP
- **SQLite** (better-sqlite3) — base de données
- **Joi** — validation des données
- **Jest** — tests unitaires