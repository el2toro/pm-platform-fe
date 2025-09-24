# Copilot Instructions for pm-platform-fe

## Project Overview
- This is an Angular (v18) frontend project, generated with Angular CLI.
- The main app code is in `src/app/`, organized by feature and core modules.
- Features are grouped under `src/app/features/`, e.g., `dashboard-feature`, `kanban-board-feature`, etc.
- Shared UI and utility code is in `src/shared/`.
- Core services, authentication, guards, and global components are in `src/app/core/`.

## Key Patterns & Conventions
- **Feature Modules:** Each feature (e.g., dashboard, kanban) has its own folder with components, apis, models, enums, and pipes.
- **Service Layer:** API communication is handled by services in `apis/` subfolders within each feature or in `core/services/` for app-wide logic.
- **Authentication:** Auth logic is in `src/app/core/auth/` (services, interceptors, models, login UI).
- **Guards:** Route guards are in `src/app/core/guards/`.
- **UI Components:** Shared components are in `src/shared/components/`.
- **Styling:** SCSS is used, with variables and partials in `src/styles/`.

## Developer Workflows
- **Start Dev Server:** `ng serve` (or `npm start`)
- **Run Tests:** `ng test` (or `npm test`)
- **Build:** `ng build`
- **Generate Code:** Use Angular CLI (`ng generate component|service|module ...`)

## Integration & Data Flow
- **API Services:** Each feature typically has its own `apis/` folder for backend communication.
- **Cross-feature Communication:** Use Angular services and RxJS for state and data sharing.
- **Routing:** Defined in `src/app/app.routes.ts` and feature-level route files.
- **Theming:** Custom SCSS theme in `src/styles/custom-theme.ts` and variables in `_variables.scss`.

## Examples
- To add a new dashboard API, create a service in `src/app/features/dashboard-feature/apis/`.
- To add a shared chart, place it in `src/shared/components/wave-chart/`.
- For authentication changes, update logic in `src/app/core/auth/`.

## External Dependencies
- Angular CLI, RxJS, SCSS, and standard Angular ecosystem libraries.

## References
- See `README.md` for basic commands and Angular CLI usage.
- Explore `src/app/features/` and `src/app/core/` for architecture patterns.

---
For any unclear conventions or missing patterns, ask for clarification or check with the team.
