# IntelliPharma

## Requirements

- Node.js (LTS recommended)
- npm

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root and fill in the following variables:

```env
VITE_API_URL=
VITE_TRACKING_AUTH_ORIGIN=

VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_VAPID_KEY=

VITE_REVERB_APP_KEY=
VITE_REVERB_HOST=
VITE_REVERB_PORT=
```

## Running the Project

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```
