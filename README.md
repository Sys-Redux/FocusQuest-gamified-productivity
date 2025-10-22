# FocusQuest

A sleek, minimal task management app built with React + TypeScript. Gamified productivity with a gorgeous dark UI.

## What I Built

This is a modern task manager with Auth0 authentication, built on React 19 and Vite. The whole aesthetic is based on the **Catppuccin Mocha** color palette with frosted glass effects and subtle animated gradients. It's all dark mode (the only mode that matters).

### The Tech Stack

- **React 19.1.1** - Latest React with all the new goodies
- **TypeScript 5.9** - Because I like my code to make sense
- **Vite** - Well, actually `rolldown-vite@7.1.14`, a faster Vite variant
- **Tailwind CSS v4** - Using the new `@theme` directive (no more config files!)
- **Auth0** - Handling all the auth stuff so I don't have to
- **React Router DOM v7** - Client-side routing with protected routes
- **Context API** - Simple state management, no bloat

### Design Philosophy

I wanted something that felt **premium** but wasn't over the top. So I went with:

- **Catppuccin Mocha** - The entire dark theme palette as CSS custom properties
- **Glassmorphism** - Frosted glass effects using `backdrop-blur` with semi-transparent backgrounds
- **Animated Gradients** - Subtle rotating gradients on the background (300s duration so it's barely noticeable but adds depth)
- **Mobile-First** - Everything is responsive, using breakpoints to indicate screen-size
- **Minimal UI** - No clutter, just what you need to see your tasks

## Project Structure

```md
src/
├── components/          # Reusable UI components
│   ├── Auth0Guard.tsx      # Protected route wrapper
│   ├── LoginButton.tsx     # Auth0 login trigger
│   ├── LogoutButton.tsx    # Auth0 logout trigger
│   ├── NavBar.tsx          # Fixed frosted glass navbar
│   └── TaskForm.tsx        # Modal form for adding tasks
├── context/            # State management
│   ├── Auth0ProviderWithNavigate.tsx  # Auth0 + Router integration
│   ├── TaskContext.tsx                # Context definition
│   └── TaskProvider.tsx               # Context provider with CRUD
├── hooks/              # Custom hooks
│   └── useTasks.ts        # Hook to consume TaskContext
├── pages/              # Route components
│   ├── Callback.tsx       # Auth0 callback handler
│   ├── Dashboard.tsx      # Main app view
│   ├── Login.tsx          # Landing/login page
│   └── ProfileModal.tsx   # User profile modal
├── types/              # TypeScript definitions
│   ├── task.ts           # Task interface
│   └── user.ts           # User interface
├── App.tsx             # Route configuration
├── main.tsx            # App entry point
└── index.css           # Tailwind + custom styles
```

## Key Features

### Authentication

- Auth0 Universal Login integration
- Protected routes using HOC pattern
- Profile modal showing user info
- Persistent sessions with refresh tokens

### Task Management

- Create tasks with title, description, priority
- Optional due dates
- Mark tasks complete/incomplete
- Real-time stats (total, completed, pending)
- Priority badges (low/medium/high)

### UI/UX

- Glassmorphism effects on all cards
- Animated gradient backgrounds
- Responsive design (mobile → desktop)
- Fixed navbar that doesn't get in the way
- Modal-based forms and profile view

## Setup

### Prerequisites

- Node.js (latest LTS recommended)
- Auth0 account

### Installation

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Auth0 Configuration

1. Create an Auth0 Application (Single Page Application)
2. Set **Allowed Callback URLs**: `http://localhost:5173/callback, http://localhost:5173/dashboard`
3. Set **Allowed Logout URLs**: `http://localhost:5173`
4. Set **Allowed Web Origins**: `http://localhost:5173`
5. Add `openid profile email` to requested scopes
6. (Optional) Configure social connections like Google in the Auth0 dashboard

## Code Architecture

### Context Pattern

I separated the context into three files to keep React Fast Refresh happy:

- `TaskContext.tsx` - Context definition only
- `TaskProvider.tsx` - Provider component with state logic
- `useTasks.ts` - Custom hook for consuming context

### Routing Structure

```tsx
/ → Login page (redirects to /dashboard if authenticated)
/dashboard → Protected dashboard (requires auth)
/callback → Auth0 callback handler
```

### Styling Approach

Using Tailwind v4's `@theme` directive in `index.css`:

- All Catppuccin colors as CSS custom properties
- Custom utility classes: `.glass`, `.glass-strong`, `.gradient-bg`, `.gradient-bg-vibrant`
- Mobile-first responsive design with custom breakpoints

### State Management

Tasks are currently stored in-memory using React Context. The provider offers:

- `addTask(task: Task)`
- `updateTask(id: string, task: Partial<Task>)`
- `deleteTask(id: string)`
- `toggleTaskComplete(id: string)`

## What's Next

This is v1 — the simple version. Future enhancements I'm thinking about:

- [ ] Backend API integration (probably Supabase or Firebase)
- [ ] Task editing UI
- [ ] Task deletion with confirmation
- [ ] User-specific task filtering
- [ ] Task categories/tags
- [ ] Dark/light theme toggle (jk, dark mode forever)
- [ ] Due date reminders
- [ ] Task search and filtering
- [ ] Maybe bring back the gamification stuff from the original roadmap?

## Lessons Learned

- **Tailwind v4** changed everything — the `@theme` directive is way cleaner than config files
- **Fast Refresh** breaks if you mix component and non-component exports in the same file
- **Auth0 scopes** need to be explicitly requested (`openid profile email`)
- **Fixed navbars** need padding compensation on page content (`pt-20` for a `h-16` navbar)
- **clamp()** for fluid typography > breakpoint-based font sizes

## Notes

- Profile pictures from Auth0 might not show up if your Auth0 social connection doesn't include the picture scope — that's a provider config thing
- Tasks reset on page refresh since there's no backend yet
- The animated gradient is set to 300 seconds so it's super subtle

---

Built with ☕ and way too much time tweaking glassmorphism effects
