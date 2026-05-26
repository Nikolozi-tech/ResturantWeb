# Maracana Georgian Bistro App

Production-grade React/Vite/Tailwind prototype for **მარაკანა** with segregated public and staff routes.

## Routes

- `/` - public customer menu with no admin links or references.
- `/book` - reservation checkout flow with fixed +995 phone prefix and 12:00-23:00 slots.
- `/admin` - standalone staff operations dashboard available only by direct URL.

## Development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```
