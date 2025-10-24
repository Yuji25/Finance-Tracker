# FinTrack – Client (React + Vite)

Modern, responsive UI for the Finance Tracker.

## Stack

- React 19, Vite 7
- Tailwind CSS 3 (custom palette, Inter + Space Grotesk fonts)
- Framer Motion (subtle animations)
- Recharts (analytics charts)
- React Router v7
- Headless UI + Heroicons

## App structure

- Landing (`/`): Intriguing hero, finance facts, responsive layout
- Auth (`/auth`): Login/Signup toggle card
- Dashboard (`/dashboard`): Balance, stat cards, expense/income pies, transactions tabs
- Transactions (`/transactions`): Add/view grouped by Expense, Income, Len/Den

## Run locally

```powershell
cd "c:\Users\Lavanya\Desktop\Test Projects\project2\Client"
npm install
npm run dev
```

The API base URL is configured at `src/utils/api.js`.

## Design notes

- Color palette lives in `tailwind.config.js` (brand and ink scales)
- Reusable utilities: see `src/index.css` (btn, card, heading)
- Navbar + Footer wrap all pages; Private routes protect app areas

## Screens

- Clean stat cards for Income, Expense, Len/Den
- Smooth tab switch for sections; skeletons/spinners during loads

