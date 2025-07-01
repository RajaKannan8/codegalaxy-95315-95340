# DevArena Frontend

DevArena Frontend delivers an immersive, gamified React-based UI for code review, bug logging, rule mission control, and cosmic dashboards.

## Getting Started

### Prerequisites

- Node.js v18+
- npm v9+ (comes with Node)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd devarena_frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the app (development)**
   ```bash
   npm start
   ```
   Access at [http://localhost:3000](http://localhost:3000)

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Run tests**
   ```bash
   npm test
   ```

> The app is designed for local proxy to backend APIs at `/api`.

---

## High-Level Architecture

```mermaid
graph TD
    A[User Browser] --> B[DevArena React App]
    B -- REST Calls --> C[DevArena Backend API]
    subgraph UI Layout
      B --> D[SideNav (3D Planets)]
      B --> E[TopBar (Cosmic)]
      B --> F[Starfield Widget]
      B --> G[Main Content: GlassPanel]
      G --> H(Pages)
      H --> H1[Home]
      H --> H2[Projects]
      H --> H3[Leaderboard]
      H --> H4[Redeem]
      H --> H5[PR/Bug Board]
      H --> H6[RuleManager]
      H --> H7[DisputeCenter]
      H --> H8[UserProfile]
      B --> I[NotificationWidget]
    end
    C --/api/v1/*--> |APIs| Cx[Backend Routers]
```

- All data flows via central API utility (`src/api.js`)
- App-wide state/context is managed by `DevArenaContext`
- Theme/colors managed with `ThemeContext` and CSS variables

---

## Main Features

- **Cosmic Dashboard UI**: Responsive, animated backgrounds, side navigation styled as planets, glassmorphic panels for all main content.
- **Project & PR Review**: List projects and repositories, drag/drop bug and PR management, real-time feedback.
- **Bug Logging & Resolution**: Submit, view, and promote bugs to PRs visually.
- **Rules Mission Control**: (Planned) Manage/customize PR quality rules per project/org.
- **Dispute Center**: (Planned) Submit and mediate code review or project conflicts.
- **Leaderboard & Gamification**: XP rings, top contributors, level-up flares, badges.
- **Redeem Center**: Earn and trade XP for rewards.
- **Micro-Interactions**: Level-up, bug found, redeem toasts and banners.
- **Theming**: Galactic, Nebula, High Contrast themes (customizable).

---

## Frontend Modules & Components

- **`src/App.js`**: Application root, layout/orchestration, routing.
- **`src/state/DevArenaContext.js`**: App-wide state (user, notifications, xp, micro-interactions).
- **`src/api.js`**: Central REST API client (all backend interaction).
- **`src/theme/ThemeContext.js`**: Dynamic/animated theme handling.
- **`src/components/SideNav.js`**: 3D side navigation (planets).
- **`src/components/TopBar.js`**: App bar, user highlights, theme toggle.
- **`src/widgets/Starfield.js`**: Animated cosmic background layer.
- **`src/widgets/NotificationWidget.js`**: Global notifications, event feedback.
- **`src/pages/`**: Route-based content:
  - `Home.js`: Splash + intro
  - `Projects.js`: Projects/org catalog
  - `Leaderboard.js`: Top XP/completionists
  - `Redeem.js`: Reward claiming
  - `PRBoard.js`: Pull requests & bug board
  - `RuleManager.js`: (Planned) Rule management
  - `DisputeCenter.js`: (Planned) Conflict mediation
  - `UserProfile.js`: Avatar, stats, history

---

## Backend API Integration

APIs are called via `src/api.js`. Example endpoints (see backend doc for full spec):

- `/api/v1/auth/login`
- `/api/v1/projects/`
- `/api/v1/bugs/`
- `/api/v1/disputes/`
- `/api/v1/leaderboards/`
- `/api/v1/gamification/*`
- `/api/v1/rules/`
- `/api/v1/redeem/*`
- `/api/v1/notifications/`

Use browser or network inspector to debug requests/responses. Backend URL defaults to `/api`.

---

## Running Tests

Unit and integration tests should be placed in `src/` alongside components or in `__tests__` folders.

### Recommended Test Coverage

- **Component tests**: All interactive components and pages (rendering, user interaction, error states).
- **API contract tests**: `src/api.js` functions, especially authentication, project, bug, and reward flows.
- **Integration/E2E**: Simulate full user flows (login, bug log, PR promotion, XP updates).
- **Accessibility**: ARIA labels, keyboard, and color contrast (especially for cosmic/dark themes).

Use React Testing Library and Jest (preconfigured). Example:

```bash
npm test
```

_TODO: Add deeper test coverage for all feature modules, especially PR/bug board drag-drop and redeem logic._

---

## Customization

Colors and styles defined in `src/App.css` and `ThemeContext.js`; update or add new "themes" as needed.

---

## License

MIT or see repository.

