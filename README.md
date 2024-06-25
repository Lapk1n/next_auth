## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Update prisma

```bash
pnpm prisma generate
pnpm prisma migrate reset (if you need to update the current schema)
pnpm prisma db push
```

## Deployed
https://next-auth-7jvy.vercel.app
