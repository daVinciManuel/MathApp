# Frontend Architecture Documentation

## Overview

This document explains the refactored frontend structure implemented in the MathApp project, specifically focusing on the new `core` folder and its subfolders. The goal is to provide clarity on the architectural decisions and future direction.

## Current Structure

```
frontend/src/
├── core/
│   ├── context/          # React context & state management
│   ├── services/         # HTTP requests & API logic
│   └── utils/            # Helper functions & utilities
├── components/           # Reusable UI components
├── pages/                # Page-level components (route views)
└── [Other files]         # App.jsx, Layout.jsx, main.jsx, etc.
```

## Why We Created the `core` Folder

The `core` folder serves as a **dedicated namespace for business logic and state management**. By isolating these concerns from UI components, we achieve better separation of concerns and improved maintainability.

### Benefits of This Structure

1. **Separation of Concerns**: Business logic (HTTP requests, state management) is completely separate from UI presentation logic.
2. **Reusability**: Services and context can be easily imported and reused across multiple components without tight coupling.
3. **Testability**: Core logic can be tested independently from UI components.
4. **Scalability**: As the app grows, it's easier to add new services, contexts, and utilities without cluttering the main `src` directory.
5. **Team Clarity**: Developers immediately understand where to find and add business logic.

---

## Core Subfolders Explained

### 1. `core/context/`

**Purpose**: Centralized React Context for application state management.

**Current Contents**:
- `authContext.jsx` — Manages user authentication state, provides `useAuth()` hook

**Key Responsibilities**:
- Maintains global state (user data, authentication status)
- Provides hooks for consuming that state throughout the app
- Handles state mutations (`setUser`, `refetchUser`)

**Example Usage**:
```jsx
import { useAuth } from "../core/context/authContext";

function MyComponent() {
  const { user, setUser, refetchUser } = useAuth();
  // Use user state and functions
}
```

**Future Additions**:
- Potential theme context (dark/light mode)
- User preferences/settings context
- Notification/toast context for global notifications

---

### 2. `core/services/`

**Purpose**: Encapsulates all HTTP requests and external API communication.

**Current Contents**:
- `api.js` — Central Axios instance with baseURL and default configuration
- `authService.js` — Login, register, logout endpoints
- `gameService.js` — Game exercises fetching
- `resultsService.js` — Save results, generate AI messages, check auth status

**Key Responsibilities**:
- Abstract HTTP communication details from components
- Centralize API endpoints and configuration
- Handle request/response formatting
- Provide consistent error handling

**Example Usage**:
```jsx
import { login } from "../core/services/authService";

const handleSubmit = async (formData) => {
  try {
    const res = await login(formData);
    // Handle response
  } catch (err) {
    // Handle error
  }
};
```

**Why Services Matter**:
- Components focus on UI logic, not HTTP details
- Changing an API endpoint requires modification in only one place
- Easy to add caching, retry logic, or middleware later
- Consistent authentication handling across all requests

**Future Additions**:
- User profile service (fetch, update profile)
- Game history/analytics service
- Custom games service
- Dashboard service

---

### 3. `core/utils/`

**Purpose**: Reusable utility functions and helpers.

**Current Contents**:
- `validations.js` — Object validation helpers (e.g., `trimObject`)

**Key Responsibilities**:
- Provide pure functions for common tasks
- Avoid code duplication across components
- Offer data transformation and validation helpers

**Example Usage**:
```jsx
import { trimObject } from "../core/utils/validations";

const cleanData = trimObject(formData);
```

**Future Additions**:
- Date/time formatters
- Number formatting utilities
- String manipulation helpers
- API response parsers
- Error message formatters

---

## Why NOT to Put Business Logic in Components

### ❌ Before (Anti-pattern):
```jsx
// Game.jsx - mixing concerns
import axios from "axios";

const Game = () => {
  useEffect(() => {
    axios.get(`http://localhost:5000/api/game/n${nivel}/${operacion}`)
      .then(res => setEjercicios(res.data))
      .catch(err => console.log(err));
  }, [gameOption]);
  
  return <div>{/* UI code */}</div>;
};
```

**Problems**:
- Hard to test (requires mocking axios)
- API details leak into component
- Endpoint URL scattered throughout codebase
- Difficult to reuse logic
- Mix of business and UI logic

### ✅ After (Best practice):
```jsx
// Game.jsx - clean and focused
import { getGameExercises } from "../core/services/gameService";

const Game = () => {
  useEffect(() => {
    getGameExercises(nivel, operacion)
      .then(res => setEjercicios(res.data))
      .catch(err => console.log(err));
  }, [gameOption]);
  
  return <div>{/* UI code */}</div>;
};
```

**Benefits**:
- Easy to test (service is a pure function)
- Component only knows what it needs to know
- Consistent API handling
- Reusable across components
- Clear separation of concerns

---

## Current Import Patterns

### Service Imports:
```jsx
import { login } from "../core/services/authService";
import { getGameExercises } from "../core/services/gameService";
import { saveGameResult, generateAIMessage } from "../core/services/resultsService";
```

### Context Imports:
```jsx
import { useAuth } from "../core/context/authContext";
```

### Utils Imports:
```jsx
import { trimObject } from "../core/utils/validations";
```

---

## Future Roadmap

### Immediate (Next Phase):

#### 1. **UI Folder** (`frontend/src/ui/`)
Move reusable UI components that are not page-level into a dedicated folder:
```
frontend/src/ui/
├── Button/
├── Modal/
├── Loading/
├── Header/
├── Card/
└── [Other reusable components]
```

**Benefits**:
- Clear distinction between page components and reusable UI
- UI components are easier to style consistently
- Makes component library development simpler
- Team can work on UI independently from page logic

#### 2. **Layout Folder** (`frontend/src/layouts/`)
Isolate layout components and page templates:
```
frontend/src/layouts/
├── MainLayout.jsx
├── AuthLayout.jsx
├── DashboardLayout.jsx
└── [Other layout variants]
```

**Benefits**:
- Reusable page structures
- Consistent styling across pages
- Easier to manage header/footer/sidebar logic
- Reduces duplication in page components

### Expected Result:
```
frontend/src/
├── core/
│   ├── context/
│   ├── services/
│   └── utils/
├── pages/              # Route-level components only
├── layouts/            # Page layout templates
├── ui/                 # Reusable UI components
└── [Other files]
```

---

## Implementation Timeline

1. **Phase 1** (Current): ✅ Core folder structure established
2. **Phase 2** (Next): Create `ui/` folder and migrate reusable components
3. **Phase 3**: Create `layouts/` folder and consolidate layout logic
4. **Phase 4**: Add theming system (using context + UI components)
5. **Phase 5**: Optimize styling and component composition

---

## Team Guidelines

### When Adding New Code:

**Is it a business/HTTP concern?** → Add to `core/services/`

**Is it global state?** → Add to `core/context/`

**Is it a reusable helper?** → Add to `core/utils/`

**Is it a reusable UI component?** → Add to `components/` (or `ui/` after Phase 2)

**Is it a page view?** → Add to `pages/`

### Import Rules:

1. **Services** should NOT import from pages or components
2. **Components** should import from services and context freely
3. **Pages** should be thin wrappers around components
4. **Utils** are pure functions with no dependencies on React or services

---

## Conclusion

This new structure provides:
- ✅ Clear separation of business logic from UI
- ✅ Improved code reusability
- ✅ Better team collaboration
- ✅ Easier testing and maintenance
- ✅ Scalable foundation for future features

We're committed to continuing this architectural improvement with the upcoming `ui/` and `layouts/` folders to further accelerate the styling and component development process.

---

## Questions?

For questions about the architecture or adding new features, consult this document and the code examples provided in the `core/` folders.
