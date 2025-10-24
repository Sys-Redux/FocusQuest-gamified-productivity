import { useState, useEffect, type ReactNode } from 'react'
import { TaskContext } from './TaskContext'
import { type Task } from '../types/task'
import { useAuth0 } from '@auth0/auth0-react'
import { useUserProgress } from '../hooks/useUserProgress'
import { calculateTaskXP } from '../utils/gamification'
import { supabase } from '../utils/supabase'


export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [supabaseUserId, setSupabaseUserId] = useState<string | null>(null)
  const { user, isAuthenticated } = useAuth0()
  const { addXP } = useUserProgress()

  // Sync Auth0 user to Supabase and get Supabase user ID
  useEffect(() => {
    const syncUser = async () => {
      if (!isAuthenticated || !user) {
        console.log('User not authenticated')
        setSupabaseUserId(null)
        setTasks([])
        setLoading(false)
        return
      }

      console.log('Syncing user with Auth0 ID:', user.sub)

      try {
        // Check if user exists in Supabase
        const { data: existingUser, error: fetchError } = await supabase
          .from('users')
          .select('id')
          .eq('auth0_id', user.sub!)
          .single()

        if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 = no rows
          console.error('Error fetching user:', fetchError)
          alert(`Database error: ${fetchError.message}. Check console for details.`)
          return
        }

        let userId: string

        if (existingUser) {
          console.log('Found existing user:', existingUser.id)
          userId = existingUser.id
        } else {
          console.log('Creating new user in Supabase...')
          // Create new user in Supabase
          const { data: newUser, error: insertError } = await supabase
            .from('users')
            .insert({
              auth0_id: user.sub!,
              email: user.email,
              name: user.name,
            })
            .select()
            .single()

          if (insertError) {
            console.error('Error creating user:', insertError)
            alert(`Failed to create user: ${insertError.message}`)
            return
          }

          console.log('New user created:', newUser.id)
          userId = newUser.id

          // Initialize user progress
          console.log('Creating user progress...')
          const { error: progressError } = await supabase.from('user_progress').insert({
            user_id: userId,
            current_xp: 0,
            total_xp: 0,
            level: 1,
          })

          if (progressError) {
            console.error('Error creating user progress:', progressError)
          }
        }

        console.log('Setting Supabase user ID:', userId)
        setSupabaseUserId(userId)
      } catch (error) {
        console.error('Error syncing user:', error)
        alert(`Unexpected error: ${error}`)
      }
    }

    syncUser()
  }, [isAuthenticated, user])

  // Load tasks when user is synced
  useEffect(() => {
    const loadTasks = async () => {
      if (!supabaseUserId) {
        setLoading(false)
        return
      }

      try {
        const { data, error } = await supabase
          .from('tasks')
          .select('*')
          .eq('user_id', supabaseUserId)
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Error loading tasks:', error)
          return
        }

        setTasks(data as Task[])
      } catch (error) {
        console.error('Error loading tasks:', error)
      } finally {
        setLoading(false)
      }
    }

    loadTasks()
  }, [supabaseUserId])

  const addTask = async (task: { title: string; description: string; priority: 'low' | 'medium' | 'high'; difficulty: 'easy' | 'medium' | 'hard'; due_date?: string }) => {
    if (!supabaseUserId) {
      console.error('No Supabase user ID - cannot add task')
      alert('Error: Not connected to database. Please refresh the page.')
      return
    }

    console.log('Adding task for user:', supabaseUserId)
    console.log('Task data:', task)

    const { data, error } = await supabase
      .from('tasks')
      .insert({
        title: task.title,
        description: task.description,
        priority: task.priority,
        difficulty: task.difficulty,
        due_date: task.due_date || null,
        user_id: supabaseUserId,
        completed: false,
        xp_awarded: false,
      })
      .select()
      .single()

    if (error) {
      console.error('Error adding task:', error)
      alert(`Failed to add task: ${error.message}`)
      return
    }

    console.log('Task added successfully:', data)
    setTasks((prev) => [data as Task, ...prev])
  }

  const updateTask = async (id: string, updates: Partial<Task>) => {
    if (!supabaseUserId) return

    const { data, error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', id)
      .eq('user_id', supabaseUserId)
      .select()
      .single()

    if (error) {
      console.error('Error updating task:', error)
      return
    }

    setTasks((prev) => prev.map((t) => (t.id === id ? (data as Task) : t)))
  }

  const deleteTask = async (id: string) => {
    if (!supabaseUserId) return

    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id)
      .eq('user_id', supabaseUserId)

    if (error) {
      console.error('Error deleting task:', error)
      return
    }

    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  const toggleTaskComplete = async (id: string) => {
    const task = tasks.find((t) => t.id === id)
    if (!task || !supabaseUserId) return

    const nowCompleted = !task.completed
    const updates: Partial<Task> = {
      completed: nowCompleted,
      completed_at: nowCompleted ? new Date().toISOString() : null,
    }

    // Award XP only on first completion
    if (nowCompleted && !task.xp_awarded) {
      const xpEarned = calculateTaskXP(task.difficulty, task.priority)
      addXP(xpEarned)
      updates.xp_awarded = true

      alert(`Task completed! +${xpEarned} XP`)
    }

    await updateTask(id, updates)
  }

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, updateTask, deleteTask, toggleTaskComplete, loading }}
    >
      {children}
    </TaskContext.Provider>
  )
}