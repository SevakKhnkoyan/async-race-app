# async-race-app
# Async Race
server https://github.com/mikhama/async-race-api

**Deployed UI:** [https://async-race-app-sage.vercel.app/](https://async-race-app-sage.vercel.app/)
**Estimated Score:** **400 / 400** (all features implemented)

A single‑page React + TypeScript app for the *Async Race* task. Manage a garage of cars, run races with start/stop/ reset controls, and track winners with pagination & sorting.

---

## Tech Stack

* **React 18**, **TypeScript**, **Vite**
* **Redux Toolkit** & **RTK Query** for state and data fetching
* **SCSS** for styling
* Deployed on **Vercel**

---

## Getting Started (Local)

> The interviewer will run their own backend; these steps are for local development.

```bash
# 1) Install
npm i

# 2) Run dev server
npm run dev
```

---

## Features

* **Garage**: create/update/delete cars, color picker (RGB), random 100 cars generator, pagination (7 per page), per‑car controls.
* **Race Controls**: start/stop per car, start all, reset all, announcement of winner.
* **Winners**: table with car №, image, name, wins, best time (s); pagination (10 per page); sorting by wins/time.
* **Persistence**: view state (page/sort, forms) preserved when navigating between views.

---

## Checklist **(400 / 400 pts)**

### 🚀 UI Deployment

* ✅ **Deployed UI** on Vercel — link at the top of this README

###  Requirements to Commits and Repository

* ✅ Commit guidelines compliance (clear, conventional commit style)
* ✅ Checklist included in README.md
* ✅ Score calculated and placed at the top
* ✅ UI deployment link placed at the top

### Basic Structure (**80 pts**)

* ✅ **Two Views** (10): *Garage*, *Winners*
* ✅ **Garage View Content** (30): view name, car creation & editing panel, race control panel, garage section
* ✅ **Winners View Content** (10): view name, winners table, pagination
* ✅ **Persistent State** (30): page numbers & inputs preserved across navigation

### Garage View (**90 pts**)

* ✅ **CRUD** (20): create/update/delete cars; validation for empty/too‑long names; deleting removes from *garage* and *winners*
* ✅ **Color Selection** (10): RGB palette with live color on car image
* ✅ **Random Cars** (20): create 100 random cars per click (brand + model; random color)
* ✅ **Car Management Buttons** (10)
* ✅ **Pagination** (10): 7 cars per page
* ✅ **EXTRA (20)**: graceful empty garage; auto step back when last car on a page is deleted

### 🏆 Winners View (**50 pts**)

* ✅ **Display Winners** (15): car appears after it wins; wins increment; best time kept if improved
* ✅ **Pagination** (10): 10 per page
* ✅ **Winners Table** (15): №, image, name, wins, best time (s)
* ✅ **Sorting** (10): by wins and best time (asc/desc)

### 🚗 Race (**170 pts**)

* ✅ **Start Engine Animation** (20): handles velocity/drive; stops on 500 error
* ✅ **Stop Engine Animation** (20): returns car to start
* ✅ **Responsive Animation** (30): smooth on ≥500px screens
* ✅ **Start Race Button** (10): starts all cars on page
* ✅ **Reset Race Button** (15): returns all cars to starting positions
* ✅ **Winner Announcement** (5): popup/banner shows the winning car
* ✅ **Button States** (20): prevent invalid actions (disable appropriately)
* ✅ **Actions during the race** (50): predictable behavior while adding/editing/deleting cars, changing page/view during an active race

### 🎨 Prettier and ESLint (**10 pts**)

* ✅ **Prettier** (5): `format` & `ci:format` scripts
* ✅ **ESLint (Airbnb)** (5): strict TS config and `lint` script

---

## Score Calculation

* Total: **400 pts**
* **Estimated Score:** **400 / 400**

---

## Notes / Trade‑offs

* Focus on robust animations, state, and data integrity.
* Data fetching uses RTK Query with caching and tag‑based invalidation.

---

## Folder Structure (excerpt)

```
src/
  components/
    Header/ Footer/ Loader/ …
  pages/
    garage/
      garagePage/
        Garage.tsx
    winners/
      Winners.tsx
  services/  # RTK Query APIs (carsApi, winnersApi)
  store/     # Redux store & slices
  styles/
```

---

## License

MIT (for educational purposes)
