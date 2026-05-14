# IntelliPharma Copilot Instructions

## Overview

This file helps AI coding assistants generate changes that match the observed IntelliPharma codebase. It is based only on actual patterns in the repository: feature-sliced folder structure, React Router layouts, Redux session state, React Query data hooks, shared UI primitives, i18n, theming, barcode scanning, mapping, shared filter utilities, query key factories, and pharmacy ERP workflows.

## File Category Reference

### project-config

Representative files: `package.json`, `vite.config.ts`, `eslint.config.js`, `tsconfig.json`, `components.json`, `README.md`.

This category defines the project’s build and tooling surface. The repo uses Vite, the React Compiler Babel plugin, Tailwind v4, path alias `@ -> ./src`, and shadcn-style aliasing into `src/shared/ui` and `src/shared/lib`.

### app-shell

Representative files: `src/app/App.tsx`, `src/app/router/AppRouter.tsx`, `src/app/layouts/RootLayout.tsx`, `src/app/providers/AuthProvider.tsx`, `src/app/store/store.ts`.

This category owns bootstrap, providers, layout shells, router wiring, error handling, and global styles. It is where route-level composition and app-wide side effects live.

### shared-foundation

Representative files: `src/shared/api/apiClient.ts`, `src/shared/ui/Button.tsx`, `src/shared/lib/utils.ts`, `src/shared/config/i18n/index.ts`, `src/shared/form/fields/BilingualNameFields.tsx`.

This category is the reusable foundation layer. It contains the design system, generic hooks and helpers, app configuration, translation bootstrap, map/barcode helpers, and shared form pieces.

### entity-modules

Representative files: `src/entities/session/model/slice.ts`, `src/entities/order/ui/OrderRow.tsx`, `src/entities/medicine/model/useGetMedicine.ts`, `src/entities/pharmacy/ui/PharmacyForm.tsx`.

This category holds business nouns. Each entity keeps its own model, UI, API, and helper code close together and exposes it through a small barrel.

### feature-modules

Representative files: `src/features/login/ui/LoginForm.tsx`, `src/features/auth/ui/ProtectedRoute.tsx`, `src/features/order-change-status/ui/ChangeOrderStatus.tsx`, `src/features/medicine-restock/ui/MedicineRestockForm.tsx`.

This category contains action-oriented workflows. Features orchestrate entity hooks, shared UI, and mutation logic without taking over page routing.

### page-modules

Representative files: `src/pages/login/ui/LoginPage.tsx`, `src/pages/order-list/ui/OrderListPage.tsx`, `src/pages/medicine-detail/ui/MedicineDetailPage.tsx`, `src/pages/ai-chat/ui/ChatPage.tsx`.

This category contains route-level screens. Pages compose features, entities, and shared UI into list/detail/create/edit/dashboard views and often provide lazy entry points and page-specific models.

### widget-modules

Representative files: `src/widgets/sidebar/ui/AppSidebar.tsx`, `src/widgets/sidebar/ui/NavMain.tsx`, `src/widgets/sidebar/ui/NavUser.tsx`.

This category contains larger composed UI blocks that are shared across many screens but are not full pages.

### assets

Representative files: `public/logo.svg`, `public/markers/pharmacy.png`, `public/markers/simple.png`, `public/markers/truck.png`.

This category contains static assets referenced by URL or asset path.

## Feature Scaffold Guide

When adding a new feature, first decide where it belongs:

- `src/pages/<name>` for a new route or screen.
- `src/features/<name>` for a workflow, dialog, form, or action.
- `src/entities/<noun>` for reusable business logic tied to one domain object.
- `src/shared/*` for reusable primitives, helpers, config, and client infrastructure.

Then follow the existing folder contract:

- Put rendering in `ui/`.
- Put data and state logic in `model/`.
- Put helper functions in `lib/`.
- Put transport logic in `api/`.
- Export the public surface from `index.ts`.
- Use `Lazy*Page.tsx` plus `WithSuspense` for heavy route entry points.

Example shape for a new dashboard screen:

- `src/pages/<name>/ui/<Name>Page.tsx`
- `src/pages/<name>/ui/Lazy<Name>Page.tsx`
- `src/pages/<name>/model/useGet<Name>.ts`
- `src/pages/<name>/index.ts`
- route registration in `src/app/router/AppRouter.tsx`

Example shape for a new workflow feature:

- `src/features/<workflow>/ui/<Component>.tsx`
- `src/features/<workflow>/model/use<Workflow>.ts`
- `src/features/<workflow>/lib/utils.ts` if needed
- `src/features/<workflow>/index.ts`

## Integration Rules

- All HTTP access goes through `src/shared/api/apiClient.ts` and React Query hooks.
- Use the shared filter helpers in `src/shared/lib` for URL parsing, serialization, canonicalization, and API params instead of hand-rolling `searchParams.get(...)` logic.
- Prefer `createDomainQueryKeys` and canonicalized filter objects for stable React Query cache keys.
- 401 handling should keep using the refresh-token retry flow in `src/app/store/store.ts`.
- Session state must continue to live in `src/entities/session`.
- Public and authenticated areas should stay split between `PublicOnlyRoute` and `ProtectedRoute`.
- Route shells should remain in `src/app/layouts` and `src/app/router`.
- New UI should reuse shared primitives from `src/shared/ui` and the token system in `src/app/styles/index.css`.
- Locale-aware UI should use `useTranslation` and update the locale JSON files.
- Theme changes should use `ThemeProvider` and the existing CSS-variable palette.
- Map, barcode, and scanner code should stay in their dedicated shared modules.

## Example Prompt Usage

If asked to create a new feature such as a searchable pharmacy filter panel, respond with files that match the existing conventions:

- `src/features/pharmacy-search/ui/PharmacySearchPanel.tsx`
- `src/features/pharmacy-search/model/usePharmacySearch.ts`
- `src/features/pharmacy-search/index.ts`
- `src/pages/pharmacy-list/ui/PharmacyFiltersModal.tsx` if the behavior is page-specific
- shared primitives like `Input`, `Popover`, `Command`, `Button`, and `Skeleton`

If asked to create a new route-level screen, use the page pattern instead:

- `src/pages/<name>/ui/<Name>Page.tsx`
- `src/pages/<name>/ui/Lazy<Name>Page.tsx`
- `src/pages/<name>/model/useGet<Name>.ts`
- `src/pages/<name>/index.ts`
- route wiring in `src/app/router/AppRouter.tsx`

Always keep the implementation aligned with the observed codebase patterns rather than introducing a new architecture.
