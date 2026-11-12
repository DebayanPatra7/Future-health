# Medical Facility Booking - React + Supabase (online database)

No backend server needed. The React app talks directly to Supabase.

## Setup
1. Create a free project at https://supabase.com
2. SQL Editor -> New query -> paste supabase.sql -> change the admin email -> Run
3. Authentication -> Users -> Add user -> same admin email + a password (tick "Auto Confirm User")
4. Project Settings -> API: copy "Project URL" and the anon / publishable key into src/config.js
5. In this folder run:
     npm install
     npm run dev
   Open http://localhost:3000

Admin login: http://localhost:3000/#/admin/login

## Deploy
npm run build   -> upload the "dist" folder to Netlify / Vercel / GitHub Pages
