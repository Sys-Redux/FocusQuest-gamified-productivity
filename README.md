# FocusQuest

A gamified task management app built with React + TypeScript. Transform your to-dos into epic quests, earn XP, level up, and conquer productivity with a stunning dark UI.

## 🎮 What This Is

**FocusQuest** is a modern productivity app that makes task management actually fun. Built with the latest React 19, it combines sleek design with RPG-style progression mechanics. Every completed task earns you XP, helping you level up as you conquer your daily quests.

The entire app is themed with the gorgeous **Catppuccin Mocha** color palette, featuring frosted glassmorphism effects and subtle animated gradients. Auth0 handles secure authentication, so you can focus on what matters — getting things done.

---

## 🚀 Tech Stack

- **React 19.1.1** - Latest React with createRoot and modern patterns
- **TypeScript 5.9** - Full type safety across the codebase
- **Vite 7.1.14** (rolldown variant) - Lightning-fast build tool
- **Tailwind CSS v4** - Using the new `@theme` directive (no config files!)
- **Auth0 React SDK 2.8.0** - Secure authentication with social login support
- **React Router DOM v7** - Client-side routing with protected routes
- **Context API** - Lightweight state management for tasks and user progress
- **localStorage** - Persistent data storage (tasks & XP progress)

---

## ✨ Key Features

### 🔐 Authentication

- **Auth0 Universal Login** - Secure email/password and social authentication (Google)
- **Protected Routes** - Dashboard accessible only to authenticated users
- **Profile Modal** - View user details, avatar, and verification status
- **Persistent Sessions** - Refresh tokens keep you logged in

### 🎯 Task Management

- **Create Quests** - Add tasks with title, description, priority, difficulty, and optional due dates
- **Priority Levels** - Low, Medium, High with color-coded badges
- **Difficulty Tiers** - Easy (10 XP), Medium (25 XP), Hard (50 XP)
- **Priority Multipliers** - High priority tasks award 1.5x XP, Medium 1.2x, Low 1x
- **Edit & Delete** - TaskModal for viewing details, editing, and deleting with confirmation
- **Completion Tracking** - Toggle tasks complete/incomplete with XP rewards
- **Real-time Stats** - Dashboard shows total, completed, and pending quests

### 🎮 Gamification System

- **XP Rewards** - Earn XP based on task difficulty and priority when completing quests
- **Level Progression** - Exponential leveling system (100 * level^1.5 XP per level)
- **XP Bar Component** - Visual progress bar showing current level, XP, and progress to next level
- **One-time Rewards** - Tasks only award XP once (prevents XP farming)
- **localStorage Persistence** - Your level and XP are saved across sessions

### 🎨 UI/UX Design

- **Catppuccin Mocha Palette** - Premium dark theme with perfect color harmony
- **Glassmorphism** - Frosted glass effects on cards, modals, and navbar
- **Scroll-aware NavBar** - Glass opacity increases on scroll for better readability
- **Animated Gradients** - Subtle 300s rotating gradient backgrounds
- **Mobile-First Responsive** - Fully responsive design from mobile to 4K displays
- **HomePage** - Stunning landing page with feature showcases and CTAs
- **Modal-based Interactions** - TaskForm and TaskModal for clean, focused workflows

---

## 📁 Project Structure

```md
src/
├── assets/              # Images and static files
│   ├── dino.png           # Feature showcase image
│   ├── quest.png          # Feature showcase image
│   └── phone.png          # Feature showcase image
├── components/          # Reusable UI components
│   ├── Auth0Guard.tsx     # Protected route wrapper (HOC pattern)
│   ├── LoginButton.tsx    # Auth0 login with redirect to dashboard
│   ├── LogoutButton.tsx   # Auth0 logout with returnTo parameter
│   ├── NavBar.tsx         # Fixed scroll-aware glass navbar with logo
│   ├── TaskForm.tsx       # Modal form for creating new tasks
│   └── XPBar.tsx          # Level and XP progress visualization
├── context/             # State management with Context API
│   ├── Auth0ProviderWithNavigate.tsx  # Auth0 + React Router integration
│   ├── TaskContext.tsx                # Task context definition
│   ├── TaskProvider.tsx               # Task CRUD + XP reward logic
│   ├── UserProgressContext.tsx        # User progress context definition
│   └── UserProgressProvider.tsx       # Level/XP state with localStorage
├── hooks/               # Custom React hooks
│   ├── useTasks.ts        # Hook to consume TaskContext
│   └── useUserProgress.ts # Hook to consume UserProgressContext
├── pages/               # Route-level components
│   ├── Callback.tsx       # Auth0 callback handler
│   ├── Dashboard.tsx      # Main app view with tasks and XPBar
│   ├── HomePage.tsx       # Landing page with features and CTAs
│   ├── Login.tsx          # Login page (redirects if authenticated)
│   ├── ProfileModal.tsx   # User profile modal popup
│   └── TaskModal.tsx      # Task detail/edit/delete modal
├── types/               # TypeScript type definitions
│   ├── task.ts            # Task interface with difficulty & xpAwarded fields
│   └── user.ts            # User & UserProgress interfaces
├── utils/               # Utility functions
│   └── gamification.ts    # XP calculation & leveling formulas
├── App.tsx              # Route configuration & provider hierarchy
├── main.tsx             # App entry point
└── index.css            # Tailwind theme + custom styles
```

---

## 🎮 Gamification Mechanics

### XP Calculation

```typescript
Base XP (Difficulty):
- Easy: 10 XP
- Medium: 25 XP
- Hard: 50 XP

Priority Multipliers:
- Low: 1x
- Medium: 1.2x
- High: 1.5x

Final XP = Base XP × Priority Multiplier
```

**Examples:**

- Easy + Low = 10 XP
- Medium + Medium = 30 XP (25 × 1.2)
- Hard + High = 75 XP (50 × 1.5)

### Leveling System

```typescript
XP Required for Level N = 100 × N^1.5

Level 1 → Level 2: 100 XP
Level 2 → Level 3: 283 XP
Level 3 → Level 4: 520 XP
Level 5 → Level 6: 1,118 XP
Level 10 → Level 11: 3,162 XP
```

---

## 🛠️ Setup & Installation

### Prerequisites

- **Node.js** (v18+ recommended)
- **Auth0 Account** (free tier works)

### Installation Steps

```bash
# Clone the repository
git clone https://github.com/Sys-Redux/FocusQuest-gamified-productivity.git
cd FocusQuest-gamified-productivity

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Auth0 Configuration

1. Create an Auth0 Application (Single Page Application)
2. Configure the following settings:
   - **Allowed Callback URLs**: `http://localhost:5173/callback, http://localhost:5173/dashboard`
   - **Allowed Logout URLs**: `http://localhost:5173`
   - **Allowed Web Origins**: `http://localhost:5173`
3. Enable Auth0 Database Connection for email/password registration
4. (Optional) Enable Google Social Connection
5. Request scopes: `openid profile email`
6. Update `src/context/Auth0ProviderWithNavigate.tsx` with your Auth0 credentials:

   ```tsx
   const domain = 'YOUR_AUTH0_DOMAIN';
   const clientId = 'YOUR_AUTH0_CLIENT_ID';
   ```

---

## 🎨 Design Philosophy

### Catppuccin Mocha Palette

Every color in FocusQuest comes from the carefully curated Catppuccin Mocha theme:

- **Primary**: Mauve (#cba6f7) - Main brand color
- **Accent**: Pink (#f5c2e7), Blue (#89b4fa), Lavender (#b4befe)
- **Semantic**: Green (success), Yellow (warning), Red (danger)
- **Base**: Dark backgrounds (#1e1e2e, #181825, #11111b)
- **Surface**: Layered surfaces (#313244, #45475a, #585b70)
- **Text**: High contrast text (#cdd6f4, #a6adc8, #bac2de)

### Glassmorphism

```css
.glass → Semi-transparent with backdrop-blur-xl
.glass-strong → More opaque with backdrop-blur-2xl
.glass-nav → Scroll-aware navbar with dynamic opacity
```

### Animated Gradients

```css
.gradient-bg → Subtle 300s rotating gradient
.gradient-bg-vibrant → Multi-color vibrant gradient for hero sections
```

---

## 🗺️ Routing Structure

```tsx
/ → HomePage (landing page, shows NavBar if authenticated)
/login → Login page (redirects to /dashboard if authenticated)
/dashboard → Dashboard (protected, requires Auth0 authentication)
/callback → Auth0 callback handler
```

### Provider Hierarchy

```tsx
BrowserRouter
  └── Auth0Provider
      └── UserProgressProvider
          └── TaskProvider
              └── Routes
```

---

## 💾 State Management

### TaskProvider

Manages all task CRUD operations and awards XP on completion:

- `addTask(task: Task)` - Add new task
- `updateTask(id: string, task: Partial<Task>)` - Update existing task
- `deleteTask(id: string)` - Remove task
- `toggleTaskComplete(id: string)` - Toggle completion & award XP (once per task)

### UserProgressProvider

Manages user level and XP progression:

- `addXP(amount: number)` - Add XP and recalculate level
- `resetProgress()` - Reset to level 1 with 0 XP
- Persists to `localStorage` as `focusquest_user_progress`

### Data Persistence

- **Tasks**: Stored in `localStorage` as `focusquest_tasks` (currently disabled, in-memory only)
- **User Progress**: Stored in `localStorage` as `focusquest_user_progress`
- **Auth Session**: Managed by Auth0 with refresh tokens in `localStorage`

---

## 🎯 Key Components

### XPBar

Displays current level, XP progress, and total XP:

- Circular level badge with gradient background
- Animated progress bar with shimmer effect
- XP needed for next level indicator
- Responsive design for mobile and desktop

### TaskModal

Comprehensive task management modal:

- **View Mode**: Display all task details, completion toggle
- **Edit Mode**: Inline form for editing title, description, priority, difficulty, due date
- **Delete Confirmation**: Overlay dialog to prevent accidental deletions
- Uses single `formData` object with `handleChange` for clean state management

### NavBar

Fixed, scroll-aware navigation:

- Glass effect intensifies on scroll
- Logo with gradient text effect
- Home button (only when authenticated)
- Profile modal trigger with user avatar
- Login/Logout buttons based on auth state

---

## 🚧 Future Enhancements

- [ ] **Backend Integration** - Supabase or Firebase for cloud sync
- [ ] **Replace Auth0** - Use Firebase for authentication
- [ ] **User-specific Tasks** - Filter tasks by Auth0 user ID
- [ ] **Task Categories/Tags** - Organize quests by project or context
- [ ] **Due Date Reminders** - Browser notifications for upcoming deadlines
- [ ] **Task Search & Filters** - Find quests by keyword, date, or status
- [ ] **Leaderboards** - Compare XP and levels with other users
- [ ] **Achievements/Badges** - Unlock rewards for milestones
- [ ] **Dark/Light Theme Toggle** - (jk, dark mode forever 😎)
- [ ] **Pomodoro Timer** - Integrate time tracking with tasks
- [ ] **Analytics Dashboard** - Productivity trends and insights

---

## 📚 Lessons Learned

- **Tailwind v4 `@theme`** - Way cleaner than config files, CSS custom properties are the future
- **Fast Refresh** - Keep component and non-component exports in separate files
- **Auth0 Scopes** - Must explicitly request `openid profile email` in authorizationParams
- **Context Separation** - Split context definition, provider, and hook into 3 files for better HMR
- **Fixed Navbars** - Always add top padding (`pt-20`) to main content to compensate for navbar height
- **localStorage** - Perfect for MVPs, but useEffect timing matters for hydration
- **XP Anti-farming** - Track `xpAwarded` boolean on tasks to prevent repeated XP gains
- **Event Propagation** - Use `stopPropagation()` on nested clickable elements (checkbox inside clickable card)
- **Single State Object** - `formData` with `handleChange` cleaner than multiple `useState` calls

---

## 🐛 Known Issues

- Tasks currently in-memory only (refresh loses data) - localStorage persistence commented out in TaskProvider
- Profile picture may not show if Auth0 social connection doesn't include picture scope
- Animated gradient is very subtle (300s duration) - might not be noticeable on all screens

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🙏 Credits

- **Catppuccin** - Beautiful pastel color palette
- **Auth0** - Secure authentication made easy
- **Tailwind CSS** - Utility-first CSS framework
- **React Team** - For React 19 and all the amazing updates

---

Built with ☕, TypeScript, and way too much time perfecting glassmorphism effects.

**Start your quest today!** 🗡️✨
