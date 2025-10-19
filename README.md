# FocusQuest - Gamified Productivity Tasking

A modern, dark-themed task management app built with React, TypeScript, and Tailwind CSS v4. Features a beautiful glassmorphism UI with animated gradient backgrounds.

## 🎨 Design Highlights

### Tailwind CSS v4 Features

This project showcases modern Tailwind CSS v4 capabilities:

**`@theme` Directive**
Instead of the old `tailwind.config.js`, I'm using the new `@theme` directive directly in CSS to define custom colors and breakpoints. This keeps everything in one place and feels more natural.

**`@layer components`**
Created reusable component classes like `.glass` and `.glass-strong` for consistent glassmorphism effects throughout the app. Much cleaner than repeating backdrop-blur and opacity values everywhere.

**Custom Animations**
Built a smooth, slow-rotating gradient background with custom `@keyframes`. The gradient uses darker, muted Catppuccin colors to create an ambient effect that doesn't compete with the UI.

### Glassmorphism & Visual Effects

- **Frosted glass cards** with `backdrop-blur` for that modern, depth-filled aesthetic
- **Animated gradient background** that subtly shifts colors over 300 seconds
- **Catppuccin Mocha theme** - a carefully chosen dark color palette that's easy on the eyes
- **Responsive design** using mobile-first approach with fluid spacing

## ⚛️ React Architecture

### Context API for State Management

Went with a clean separation of concerns:

- **`TaskContext.tsx`** - Defines the context type and creates the context
- **`TaskProvider.tsx`** - Handles all state logic and provides it to the app
- **`useTasks.ts`** - Custom hook for consuming the context

This structure prevents Fast Refresh issues (files that export components can't export non-component values) and keeps things organized.

### TypeScript Best Practices

- Using `interface` for data shapes (Task, User types)
- Proper typing for React hooks (`useState<Task[]>`, `FormEvent`, etc.)
- No `React.FC` - using regular functions with explicit prop types (modern React standard)
- Named imports (`ReactNode` instead of `React.ReactNode`) for better tree-shaking

### Component Patterns

**Dashboard** - Main view showing task stats and list with conditional rendering
**TaskForm** - Modal form with controlled inputs, form validation, and mobile-optimized UX
**Semantic HTML** - Using `<main>`, `<article>`, `<section>`, `<time>` for better SEO and accessibility

## 🚀 Key Features

- ✅ Create, complete, and manage tasks
- 📊 Real-time task statistics (total, pending, completed)
- 🎯 Priority levels (low, medium, high)
- 📅 Optional due dates
- 📱 Fully responsive (mobile-first design)
- ♿ Accessible (ARIA labels, semantic HTML)
- 🎨 Beautiful glassmorphism UI

## 🛠️ Tech Stack

- **React 19** with TypeScript
- **Vite** for blazing-fast dev experience
- **Tailwind CSS v4** with custom theme
- **React Router** for routing (ready for future pages)
- **Context API** for state management

## 📦 Installation

```bash
npm install
npm run dev
```

## 🎯 Project Structure

```
src/
├── components/
│   └── TaskForm.tsx          # Task creation modal
├── context/
│   ├── TaskContext.tsx       # Context definition
│   └── TaskProvider.tsx      # State provider
├── hooks/
│   └── useTasks.ts           # Custom hook
├── pages/
│   └── Dashboard.tsx         # Main dashboard
├── types/
│   ├── task.ts               # Task interface
│   └── user.ts               # User interface
├── index.css                 # Tailwind + custom styles
└── App.tsx                   # App entry point
```

## 💡 Design Decisions

**Why no gamification yet?**
Starting simple to nail the core functionality first. Adding XP, levels, and achievements later once the foundation is solid.

**Why Context API over Redux?**
For this project size, Context API is perfect. It's built into React, has zero dependencies, and does exactly what we need without the boilerplate.

**Why Tailwind v4?**
Wanted to try the new `@theme` and `@layer` features. The ability to define everything in CSS feels cleaner than config files, and the new Vite plugin makes it seamless.

## 🔮 Next Steps

- [ ] Add task editing and deletion
- [ ] Implement Auth0 authentication
- [ ] Add gamification (XP, levels, achievements)
- [ ] Persistent storage (localStorage or backend)
- [ ] Task categories/tags
- [ ] Dark/light theme toggle

---

Built as part of Coding Temple's TypeScript curriculum.
