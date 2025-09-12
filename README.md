# async-race-app
# Async Race

**Deployed UI:** [https://async-race-app-sage.vercel.app/](https://async-race-app-sage.vercel.app/)
**Estimated Score:** **350 / 400** (all features implemented **except** “Actions during the race”)

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

## Checklist **(370 / 400 pts)** Overall Code Quality. (100 points) Skipped during self-check

### 🚀 UI Deployment

* [x] **Deployed UI** on Vercel — link at the top of this README

### ✅ Requirements to Commits and Repository

* [x] Commit guidelines compliance (clear, conventional commit style)
* [x] Checklist included in README.md
* [x] Score calculated and placed at the top
* [x] UI deployment link placed at the top

### Basic Structure (**80 pts**)

* [x] **Two Views** (10): *Garage*, *Winners*
* [x] **Garage View Content** (30): view name, car creation & editing panel, race control panel, garage section
* [x] **Winners View Content** (10): view name, winners table, pagination
* [x] **Persistent State** (30): page numbers & inputs preserved across navigation

### Garage View (**90 pts**)

* [x] **CRUD** (20): create/update/delete cars; validation for empty/too‑long names; deleting removes from *garage* and *winners*
* [x] **Color Selection** (10): RGB palette with live color on car image
* [x] **Random Cars** (20): create 100 random cars per click (brand + model; random color)
* [x] **Car Management Buttons** (10)
* [x] **Pagination** (10): 7 cars per page
* [x] **EXTRA (20)**: graceful empty garage; auto step back when last car on a page is deleted

### 🏆 Winners View (**50 pts**)

* [x] **Display Winners** (15): car appears after it wins; wins increment; best time kept if improved
* [x] **Pagination** (10): 10 per page
* [x] **Winners Table** (15): №, image, name, wins, best time (s)
* [x] **Sorting** (10): by wins and best time (asc/desc)

### 🚗 Race (**170 pts**)

* [x] **Start Engine Animation** (20): handles velocity/drive; stops on 500 error
* [x] **Stop Engine Animation** (20): returns car to start
* [x] **Responsive Animation** (30): smooth on ≥500px screens
* [x] **Start Race Button** (10): starts all cars on page
* [x] **Reset Race Button** (15): returns all cars to starting positions
* [x] **Winner Announcement** (5): popup/banner shows the winning car
* [x] **Button States** (20): prevent invalid actions (disable appropriately)
* [ ] **Actions during the race** (50): **not implemented** — predictable behavior while adding/editing/deleting cars, changing page/view during an active race

### 🎨 Prettier and ESLint (**10 pts**)

* [x] **Prettier** (5): `format` & `ci:format` scripts
* [x] **ESLint (Airbnb)** (5): strict TS config and `lint` script

---

## Score Calculation

* Total: **400 pts**
* Missing: **Some Actions during the race** → **30 pts**
* **Estimated Score:** **370 / 400**

---

## Notes / Trade‑offs

* The race “some actions during the race” control is intentionally left out to focus on robust animations, state, and data integrity.
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
