# Full-Stack Engineer Take-Home Assignment

- This is a full-stack web application for managing a user directory and guestbook entries. It uses Remix for server-side rendering, Prisma for database interaction, and React for the frontend.

## Features

- User Management: Add, edit, and delete users.
- Guestbook Entries: Add, edit, and delete entries for each user.
- SSR with Remix: Server-side rendered pages for better performance and SEO.

## Technologies

- Frontend: Remix, React, CSS
- Backend: Prisma, Node.js
- Database: PostgreSQL

## Setup

### Install dependencies:

```sh
npm install
```

### Set up the database:
- Configure the database in .env
- Run Prisma migrations:

```sh
npx prisma migrate dev
```

### Start the app:

```sh
npm run dev
```


## Project Structure

- /app: Frontend and backend code, including API routes. 
- /prisma: Prisma schema and migration files

## Technical Dicisions

 ### SSR with Remix:
 - Data fetching is handled server-side for better SEO and performance.

 ### Database Schema:
 - Users and guestbook entries are connected with a one-to-many relationship

## Optional Enhancements

 ### Caching:
 - To improve performance for production.

 ### Database Optimizations:
 - Indexing for faster queries.
