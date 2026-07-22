# 🍽️ TP Restaurant — API Backend

API REST pour la gestion de restaurants, menus et catégories.  
Architecture N-tiers modulaire avec Node.js, TypeScript et SQLite.

## 🚀 Installation

```bash
cd backend
npm install
```

## ▶️ Lancer le serveur

```bash
npm run dev
```

Par défaut le backend utilise **SQLite** (`DATA_SOURCE=sql` dans `backend/.env`).  
Les restaurants, menus, catégories et favoris sont dans `backend/dev.db`.

```bash
npm run seed --prefix backend
```

Pour repasser en mock JSON : `DATA_SOURCE=mock`.

## 🗄️ Remplir la base de données

```bash
npm run seed
```

## 🧪 Lancer les tests

```bash
npm test
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

### Favoris
| Méthode | Route | Description |
|---------|-------|-------------|
| GET | /favoris | Liste les restaurants favoris |
| POST | /favoris/:restaurantId | Ajoute un favori |
| DELETE | /favoris/:restaurantId | Retire un favori |
| DELETE | /favoris | Vide tous les favoris |

### Recherche / recommandations
| Méthode | Route | Description |
|---------|-------|-------------|
| GET | /restaurants/search | Filtre et trie (query: prixMax, cuisine, distanceMax, populariteMin, triPar) |
| GET | /restaurants/recommend | Recommandations par barycentre pondéré des favoris |

## 🧩 Design Patterns (4)

| # | Pattern | Famille | Rôle | Emplacement |
|---|---------|---------|------|-------------|
| 1 | **Factory** | Création | Crée filtres + stratégie de tri | `patterns/factory/` |
| 2 | **Strategy** | Comportement | Tri (note/prix) + scoring barycentre | `patterns/strategies/`, `patterns/scoring/` |
| 3 | **Chain of Responsibility** | Comportement | Enchaîne les filtres | `patterns/chain/` |
| 4 | **Observer** | Comportement | Notifie les changements de favoris | `patterns/observer/` |

## ❤️ Favoris

Stockés en **SQLite** (`backend/dev.db`, table `favoris`).

```
Frontend (useFavoris) → API /favoris → FavorisService → SqlFavorisRepository
                                              ↓
                                         Observer (log + stats)
```

## ✨ Recommandation (barycentre pondéré)

**Principe** : construire un profil idéal à partir de tes favoris, puis classer tous les restos selon leur proximité à ce profil.

1. **Normaliser** chaque resto → vecteur `[note↑, prix↓, popularité↑, distance↓]` en `[0,1]`
2. **Barycentre pondéré** des favoris : `G = Σ(note_i × X_i) / Σ(note_i)`  
   - Sans favoris → profil idéal `[1,1,1,1]`
3. **Score** = `1 / (1 + distance_pondérée(resto, G))`  
   - Poids : note 30 %, distance 30 %, prix 20 %, popularité 20 %  
   - Bonus si même cuisine qu’un favori
4. **Trier** du score le plus haut au plus bas

> Un resto seulement « proche en km » mais très cher / mal noté peut finir bas : la distance n’est qu’un critère parmi 4.

## 🛠️ Technologies

- **Node.js** + **TypeScript**
- **Express** — framework HTTP
- **SQLite** (better-sqlite3) — base de données
- **Joi** — validation des données
- **Jest** — tests unitaires
