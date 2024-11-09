# Next15-Starter with Auth.js and ShadcnUI

This is a [Next.js](https://nextjs.org/) starter template bootstrapped for rapid development with modern tools and best practices.

## Features

- **Next.js 15**: The latest version of Next.js with SSR, data fetching, and more.
- **React 19RC**: The latest version of React with new hooks and more
- **TypeScript**: Enhanced developer experience with static type-checking.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Prisma**: Database ORM for PostgreSQL with type-safe queries.
- **NextAuth**: Authentication solution with support for multiple providers.
- **Radix UI**: Accessible and unstyled components for designing UI.
- **Framer Motion**: Animation library for React to create dynamic effects.
- **Husky**: Pre-commit hooks for enforcing code quality.
- **Prettier**: For code formatting
- **Eslint**: To detect bugs and problems

## Getting Started

Follow these steps to get up and running:

### Install Dependencies

Install all the necessary dependencies:

```bash
pnpm install
```

### Set Up Environment Variables

Create a `.env.local` file in the root directory and add the following environment variables:

```dotenv
NEXT_PUBLIC_APP_TITLE=""

DATABASE_URL=""
DIRECT_URL=""

AUTH_URL=""
AUTH_SECRET=""

AUTH_GOOGLE_ID=""
AUTH_GOOGLE_SECRET=""

AUTH_RESEND_KEY=""
```

### Database Setup

Generate Prisma client:

```bash
pnpm db:generate
```

Push the Prisma schema to the database:

```bash
pnpm db:push
```

Seed the database, if necessary:

```bash
pnpm db:seed
```

### Running the Development Server

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

### Building for Production

To create an optimized production build:

```bash
pnpm build
```

Run the application in production mode:

```bash
pnpm start
```

## Linting & Formatting

Lint the code using ESLint:

```bash
pnpm lint
```

Format the code using Prettier:

```bash
pnpm format
```

## Useful Scripts

- `dev`: Run the development server.
- `build`: Create a production build.
- `start`: Start the production server.
- `lint`: Run ESLint.
- `format`: Run Prettier.
- `db:generate`: Generate Prisma client.
- `db:push`: Push the Prisma schema to the database.
- `db:studio`: Run Prisma Studio.
- `db:seed`: Seed the database.
- `db:migrate`: Apply database migrations.
- `db:deploy`: Deploy the Prisma schema.

## Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs)
- [NextAuth Documentation](https://next-auth.js.org/getting-started/introduction)
- [Framer Motion Documentation](https://www.framer.com/docs/)

## License

This project is licensed under the MIT License.