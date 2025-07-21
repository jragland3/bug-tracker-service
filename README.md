# Bug Tracker App
<p>This is a project meant to demonstrate full stack development skills as well as concepts such as testing (Unit, Component, Integration, E2E, etc.), containerization, etc.

NOTE: This project is a work-in-progress

## Backend:  Node.js + Express + TypeScript
Directory: `server`
Uses:
- Node
- Express
- TypeScript
- Jest + Supertest for testing

### Starting server
#### Dev mode
- Run using `npm run dev`

#### Production (or for deployment like Docker)
`npm run build`    # Compiles TypeScript → JavaScript into /dist
`npm start`        # Runs the compiled server

#### Resetting the database
- `npx prisma generate`
- `npx prisma migrate reset --force`

#### Running Jest
In server directory:
- `npm test`
OR
- `npx jest`



## Frontend:  React + TypeScript + Vite
Directory: `client`
Uses:
- Node
- React + Vite
- TypeScript
- Vitest + React Testing Library for testing

### Starting server
#### Dev mode
- Run using `npm run dev`

#### Vitetest + RTL (React Testing Library)
- Component rendering
  - Does `<BugForm />` show a form?
- User interactions
  - Does the submit button call `onSubmit()` when clicked?
- Form validation
  - Does the form prevent empty submits?
- DOM content
  - Does it render a list of bugs correctly?
- Run vite tests:
  - `npx vitest run`