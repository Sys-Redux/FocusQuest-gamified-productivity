# FocusQuest

**Gamified productivity, powered by React, TypeScript, Supabase, and Auth0.**

Transform your to-dos into epic quests, earn XP, and level up your focus. FocusQuest is a modern, full-stack productivity app with RPG-style progression, beautiful UI, and secure cloud sync.

---

## 🚀 Tech Stack

- **React 19** + **TypeScript 5.9**
- **Vite** (rolldown)
- **Tailwind CSS v4**
- **Supabase** (Postgres, REST API, RLS)
- **Auth0** (OAuth, social login)
- **Context API** for state management

---

## ✨ Features

- **Auth0 authentication** (Google/email, secure sessions)
- **Supabase backend** (cloud sync, RLS, per-user data)
- **Task management** (CRUD, priorities, due dates)
- **XP & Leveling** (RPG-style, anti-farming)
- **XPBar** (animated, shows level & progress)
- **Glassmorphism UI** (Catppuccin Mocha theme)
- **Mobile-first, responsive**
- **Profile modal** (user info, avatar)
- **Real-time stats** (completed, pending, XP)

---

## �️ Project Structure

```md
src/
   assets/         # Images
   components/     # UI components (NavBar, TaskForm, XPBar, etc)
   context/        # Providers (Task, UserProgress, Auth0)
   hooks/          # Custom hooks
   pages/          # Route-level views (Dashboard, HomePage, etc)
   types/          # TypeScript types (task, user, database)
   utils/          # Utility functions (gamification, supabase)
   App.tsx         # App root
   main.tsx        # Entry point
   index.css       # Tailwind + custom styles
```

---

## 🛠️ Setup & Installation

**Prerequisites:** Node.js v18+, Auth0 account, Supabase project

```bash
git clone https://github.com/Sys-Redux/FocusQuest-gamified-productivity.git
cd FocusQuest-gamified-productivity
npm install
npm run dev
```

**Environment:**

- Configure `.env` with your Supabase URL and anon key:

   ```env
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

- Set up Auth0 (Single Page App):

  - Allowed Callback URLs: `http://localhost:5173/callback`
  - Allowed Web Origins: `http://localhost:5173`
  - Update `src/context/Auth0ProviderWithNavigate.tsx` with your Auth0 domain/clientId

**Supabase Database:**

- See `data.sql` for schema: users, user_progress, tasks (RLS enabled)
- Each user/task/progress row is tied to Auth0 user

---

## 🎮 Gamification System

- **XP per task:**
  - Easy: 10 XP, Medium: 25 XP, Hard: 50 XP
  - Priority multiplier: Low (1x), Medium (1.2x), High (1.5x)
- **Leveling:** XP needed = 100 × level^1.5
- **XP awarded only once per task**

---

## 🏗️ Key Components

- **XPBar:** Animated, shows level, XP, and progress
- **TaskForm/TaskModal:** Create, edit, complete, delete tasks
- **NavBar:** Glass, scroll-aware, profile modal
- **Dashboard:** All tasks, stats, XPBar
- **UserProgressProvider:** Syncs XP/level to Supabase
- **TaskProvider:** CRUD, XP logic, per-user sync

---

## 🧩 Extending & Customizing

- Add new task fields in `src/types/task.ts` and Supabase
- Adjust XP/leveling in `src/utils/gamification.ts`
- Style in `index.css` (Catppuccin Mocha, glassmorphism)

---

## 🐛 Known Issues

- Profile picture may not show for all Auth0 providers
- Animated gradient is subtle (300s duration)

---

## 📄 License

MIT

---

**Start your quest today!**
