# NewGame feature — how it works

This document explains how the NewGame flow is implemented in the MathApp frontend, how state is shared across the feature using React Context (`useContext`), and why that pattern was chosen.

Files to read first

- `frontend/src/pages/NewGame.jsx` — page entry that renders the `Card` component and a `Modal` for feedback.
- `frontend/src/components/newGameForm/Card.jsx` — main UI for a single exercise card; composes `SimpleExercise`, `ComplexExercise`, `AnswersInput`, and `NavBar`.
- `frontend/src/core/context/newGameContext.jsx` — the context provider that contains all the state and actions for the NewGame flow.

High-level flow

1. The `NewGame` page mounts and uses the `NewGameProvider` (wired at a higher level in the app) to access NewGame state via the `useNewGame()` hook.
2. `NewGame.jsx` renders a `Modal` (for save messages) and the `Card` component.
3. `Card.jsx` calls `useNewGame()` and reads `index`, `exercises`, and action functions (`updateExercise`, `onNext`, `onPrev`, `onDuplicate`, `onSave`).
4. `Card` delegates specific UI parts to subcomponents: `SimpleExercise`, `ComplexExercise`, `AnswersInput`, and `NavBar`. These children also call `useNewGame()` to read state and dispatch updates.
5. Actions like `updateExercise` mutate the `exercises` array in context (via `setExercises`) and cause all consumers to re-render with the updated data.

Why `useContext` (React Context) is used here

- Shared state across sibling components: `Card` and its children (`SimpleExercise`, `ComplexExercise`, `AnswersInput`, `NavBar`) all need access to the same piece of state (the current exercise object) and the same update functions. Context avoids prop-drilling `index`, `exercises`, and update functions through multiple layers.
- Persistent UI state across navigation between cards: when the user navigates to the next/previous card, the same context holds the `exercises` array and the current `index`, so the children render the appropriate values without remounting a different parent or passing state through many props.
- Centralized business logic and side-effects: navigation helpers (`onNext`, `onPrev`, `onDuplicate`, `onSave`) and helpers like `saveCurrentCard` live inside the context provider. This keeps components focused on rendering and the provider responsible for the data lifecycle.

Key implementation details (see `newGameContext.jsx`)

- Context shape (important exported values):

  - `index` — current card index (number)
  - `exercises` — array of exercise objects (each has `type`, `num1`, `operation`, `num2`, `customExercise`, `answers`)
  - `updateExercise(field, value)` — updates the current exercise at `index` (uses functional `setExercises` to preserve immutability)
  - `onNext()`, `onPrev()`, `onDuplicate()` — navigation and duplication logic; `onNext` ensures a new empty exercise is appended when moving past the last one
  - `onSave()` — collects exercises and (placeholder) sends them to backend (currently logs and shows modal)
  - `showModal`, `setShowModal`, `message` — modal UI state for user feedback

- `updateExercise` implementation notes:
  - It uses `setExercises(prev => { const updated = [...prev]; updated[index] = { ...updated[index], [field]: value }; return updated; })`.
  - This pattern replaces only the changed exercise object to keep state updates shallow and predictable.

How components consume context (examples)

- `SimpleExercise.jsx` reads `exercises` and `index` to populate controlled inputs and calls `updateExercise(...)` in `onChange` handlers. It also disables inputs when the current exercise `type` is not `simple`.
- `ComplexExercise.jsx` mirrors the `SimpleExercise` pattern for the `complex` type and registers value changes through `updateExercise("customExercise", ...)`.
- `NavBar.jsx` reads `index` and calls `onPrev`, `onDuplicate`, `onNext`; it also disables the "Anterior" button when `index === 0`.

Why this structure makes development easier

- Minimal prop drilling: new UI components can be added under `newGameForm/` and immediately use `useNewGame()` without updating parent props.
- Centralized validation and persistence: validation TODOs are easier to implement inside the provider (or a service) so the UI only shows validation errors and doesn't contain persistence logic.
- Easier to test: provider functions (`updateExercise`, `onNext`, `onSave`) can be unit-tested independently from the UI.

Debugging tips

- `newGameContext.jsx` already logs inside `updateExercise` and navigation helpers — these console statements are a good first place to inspect state mutations.
- To inspect the whole `exercises` array, add a `useEffect(() => console.log(exercises), [exercises])` in the provider while debugging.

How to extend or change behavior

- Persisting to backend: replace the `console.log` in `onSave()` with a call to a `newGameService.saveExercises(exercises)` function that uses the shared axios instance from `frontend/src/core/services/api.js` (remember `withCredentials` only if auth required).
- Validation: add a `validateExercise` helper inside the provider and call it from `saveCurrentCard()` and `onSave()`.
- Per-card defaults: when adding a new exercise in `onNext()`, customize the default object shape there.

Run & test locally

1. Start backend from repo root:

```bash
npm run dev
```

2. Start frontend in another shell:

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000` and navigate to the New Game page. Use the NavBar to move between cards and confirm that inputs retain values and are enabled/disabled according to the selected type.

---

File saved: `documentation/NEW_GAME.md`
