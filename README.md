# FocusQuest - Task Management App

A TypeScript + React task manager built with Vite, Tailwind CSS, and Context API.

## Tech Stack

- React 19 + TypeScript 5.9
- Vite (Rolldown) + Tailwind CSS 4.1
- React Router DOM + Auth0 (ready to implement)

## Status

**✅ Done:** Project setup, TypeScript types (`Task`, `User`), Context API (`TaskContext`, `TaskProvider`)
**🚧 Next:** `useTasks` hook, Dashboard UI, forms, Auth0, routing

## What We Built

### Context API State Management
- **TaskContext.tsx** - Defines context interface with TypeScript
- **TaskProvider.tsx** - Manages task state with CRUD operations:
  - `addTask`, `updateTask`, `deleteTask`, `toggleTaskComplete`
  - Follows React Fast Refresh best practices (component-only exports)

### TypeScript Types
- **Task** - `id`, `title`, `description`, `completed`, `priority`, `createdAt`, `updatedAt`, `dueDate?`
- **TaskFormData** - Omits auto-generated fields for forms
- **User** - Basic user interface for Auth0 integration

## Quick Start

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (localhost:5173)
npm run build        # Build for production
npm run lint         # Run ESLint
```

## Structure

```
src/
├── context/         # TaskContext, TaskProvider ✅
├── types/           # Task, User interfaces ✅
├── hooks/           # Custom hooks (empty)
├── pages/           # Page components (empty)
├── components/      # Reusable components (empty)
└── utils/           # Helper functions (empty)
```
