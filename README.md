# PE Skills Benchmark

Web app for PE teachers to run the **7th-grade softball** and **8th-grade basketball** skills checks.

Teachers log in, start a test, and share a short class code. Students join with the code (no account). Results are stored on the teacher’s account and grouped into Beginner, Developing, or Strong.

## How to use

1. Create a teacher account.
2. Click **Start a test** and pick Softball (7th) or Basketball (8th).
3. Write the 6-character code on the board.
4. Students open the site → **Student join** → enter the code → take the check.
5. Open the session to see scores, groups, and self-ratings.

## Local development

```bash
npm install
npx prisma generate
npx prisma db push
npm run dev
```

Copy `.env.example` to `.env` and set:

- `DATABASE_URL` — Postgres connection string
- `AUTH_SECRET` — long random string

## Deploy

The app is built for Vercel. Set the same environment variables in the Vercel project.
