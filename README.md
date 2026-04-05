# INF653 HW10 - Simple Todo App

A server-rendered Todo app built with Express + Handlebars that supports two database backends:

- MongoDB (via Mongoose)
- Supabase (PostgreSQL via Supabase client)

The UI runs in dark mode with a deep red accent theme.

## Features

- Create, update, toggle, and delete todos
- Persistent storage
- Pluggable database provider (`mongodb` or `supabase`) using `DB_TYPE`
- Server-rendered views with Handlebars

## Tech Stack

- Node.js
- Express
- Express Handlebars
- Mongoose (MongoDB option)
- Supabase JS (Supabase option)
- dotenv

## Project Structure

```text
.
|- app.js
|- public/
|  |- style.css
|- views/
|  |- index.hbs
|  |- layouts/main.hbs
|- lib/database/
   |- createDatabaseProvider.js
   |- DatabaseProvider.js
   |- MongoDBProvider.js
   |- SupabaseProvider.js
   |- models/
      |- mongoModels.js
      |- supabaseModels.js
```

## Prerequisites

- Node.js 18+ (recommended)
- npm
- One of:
  - A MongoDB connection URI, or
  - A Supabase project with a `todos` table

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root.

### Option A: MongoDB

```env
PORT=3000
DB_TYPE=mongodb
MONGO_URI=your_mongodb_connection_string
```

### Option B: Supabase

```env
PORT=3000
DB_TYPE=supabase
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_KEY=your_supabase_key
```


## Supabase Table Schema

Use a table named `todos` with columns compatible with the app:

```sql
create table if not exists public.todos (
  id uuid primary key default gen_random_uuid(),
  text text not null,
  completed boolean not null default false,
  created_at timestamptz not null default now()
);
```

## Run the App

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

Open: `http://localhost:3000`

## Routes

- `GET /` - render all todos
- `POST /todos` - create todo
- `POST /todos/:id/toggle` - toggle completed state
- `POST /todos/:id/update` - update todo text
- `POST /todos/:id/delete` - delete todo
