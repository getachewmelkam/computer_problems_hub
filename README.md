# Computer Problem Hub

A troubleshooting knowledge base for IT support teams. Search, browse, and
manage computer problems across six macro-categories, each with documented
causes, prevention steps, and ordered corrective fixes.

## Stack

- **Frontend:** React 18 (Vite), React Router v6, Tailwind CSS, Lucide React
- **Backend:** Firebase 9+ modular SDK — Firestore (data) + Authentication (admin access)
- **Deployment:** Static SPA build, ready for Vercel or Netlify

## Project structure

```
computer-problem-hub/
├── public/
│   └── terminal-icon.svg
├── scripts/
│   └── seed.mjs                # optional demo-data seeder
├── src/
│   ├── components/              # shared UI: Navbar, SearchBar, cards, etc.
│   ├── context/
│   │   └── AuthContext.jsx      # Firebase Auth state + login/logout
│   ├── data/
│   │   └── categories.js        # the 6 macro-categories + sub-categories
│   ├── firebase/
│   │   └── config.js            # Firebase app initialization (env-based)
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── CategoryView.jsx
│   │   ├── ProblemDetail.jsx
│   │   └── Admin/
│   │       ├── AdminLogin.jsx
│   │       ├── AdminDashboard.jsx
│   │       ├── AddProblemForm.jsx
│   │       ├── ManageProblems.jsx
│   │       └── ManageAnnouncements.jsx
│   ├── utils/
│   │   └── firestore.js         # all Firestore read/write helpers
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── firestore.rules              # public read / admin-only write rules
├── vercel.json                  # SPA rewrite rules for Vercel
├── netlify.toml                 # SPA redirect rules for Netlify
└── .env.example
```

## 1. Firebase setup

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com).
2. **Firestore Database** → create a database (start in production mode).
3. **Authentication** → Sign-in method → enable **Email/Password**.
4. **Authentication** → Users → manually add one or more admin accounts
   (email + password). There is no public sign-up form by design.
5. **Project settings** → General → "Your apps" → add a Web app, and copy the
   config values into your `.env` file.
6. In this project, the required values are:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
7. Deploy the included security rules so only signed-in admins can write:
   ```bash
   firebase deploy --only firestore:rules
   ```
   (requires the [Firebase CLI](https://firebase.google.com/docs/cli))

## 2. Local development

```bash
npm install
cp .env.example .env   # then fill in your Firebase config values
npm run dev
```

The app runs at `http://localhost:5173`.

## 3. Seeding demo content (optional)

```bash
npm install dotenv
node scripts/seed.mjs
```

This adds a few sample problems and one announcement so the UI isn't empty
on first run. Feel free to delete the seeded entries from `/admin` afterward.

## 4. Building for production

```bash
npm run build
```

Outputs a static site to `dist/`.

## 5. Deploying

### Vercel
- Import the repo in the Vercel dashboard.
- Framework preset: **Vite**.
- Add the six `VITE_FIREBASE_*` environment variables in Project Settings → Environment Variables.
- `vercel.json` already includes the SPA rewrite rule so client-side routes
  (e.g. `/problem/abc123`) don't 404 on refresh.

### Netlify
- Import the repo, or run `netlify deploy`.
- Build command: `npm run build`, publish directory: `dist` (already set in `netlify.toml`).
- Add the six `VITE_FIREBASE_*` environment variables in Site settings → Environment variables.

## Data model

**`problems` collection**
```ts
{
  macroCategory: string,           // one of the 6 categories in src/data/categories.js
  subCategory: string,
  problemText: string,
  possibleCauses: string[],
  preventiveMaintenance: string[],
  correctiveMaintenance: string[], // ordered steps
  imageUrl: string | null,
  createdAt: Timestamp,
}
```

**`announcements` collection**
```ts
{
  title: string,
  content: string,
  bannerImage: string | null,
  postType: 'Blog' | 'Advertisement' | 'Service',
  isActive: boolean,
  createdAt: Timestamp,
}
```

## Notes

- All content writes go through `src/utils/firestore.js` — extend that file
  if you add new collections or fields.
- The category color system (`src/data/categories.js`) is the single source
  of truth for accent colors used across cards, badges, and the detail page.
- `ProtectedRoute` redirects unauthenticated visitors from `/admin` to
  `/admin/login`. There is no client-side gate on Firestore itself — that's
  enforced by `firestore.rules`.
