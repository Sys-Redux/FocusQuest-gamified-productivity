import { useState, useEffect, type ReactNode } from 'react'
import { UserProgressContext } from './UserProgressContext'
import { type UserProgress } from '../types/user'
import { useAuth0 } from '@auth0/auth0-react'
import { calculateLevel } from '../utils/gamification'
import { supabase } from '../utils/supabase'

export function UserProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>({
    level: 1,
    currentXP: 0,
    totalXP: 0,
  })
  const [loading, setLoading] = useState(true)
  const [supabaseUserId, setSupabaseUserId] = useState<string | null>(null)
  const { user, isAuthenticated } = useAuth0()

  // Get Supabase user ID from Auth0 user
  useEffect(() => {
    const getUserId = async () => {
      if (!isAuthenticated || !user) {
        setLoading(false)
        return
      }

      try {
        const { data, error } = await supabase
          .from('users')
          .select('id')
          .eq('auth0_id', user.sub!)
          .single()

        if (error) {
          console.error('Error fetching user ID:', error)
          return
        }

        setSupabaseUserId(data.id)
      } catch (error) {
        console.error('Error getting user ID:', error)
      }
    }

    getUserId()
  }, [isAuthenticated, user])

  // Load user progress
  useEffect(() => {
    const loadProgress = async () => {
      if (!supabaseUserId) {
        setLoading(false)
        return
      }

      try {
        const { data, error } = await supabase
          .from('user_progress')
          .select('*')
          .eq('user_id', supabaseUserId)
          .single()

        if (error) {
          console.error('Error loading progress:', error)
          return
        }

        if (data) {
          setProgress({
            level: data.level,
            currentXP: data.current_xp,
            totalXP: data.total_xp,
          })
        }
      } catch (error) {
        console.error('Error loading progress:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProgress()
  }, [supabaseUserId])

  const addXP = async (amount: number) => {
    if (!supabaseUserId) return

    const newTotalXP = progress.totalXP + amount
    const newLevel = calculateLevel(newTotalXP)

    const updatedProgress = {
      level: newLevel,
      currentXP: progress.currentXP + amount,
      totalXP: newTotalXP,
    }

    // Update in Supabase
    const { error } = await supabase
      .from('user_progress')
      .update({
        level: newLevel,
        current_xp: updatedProgress.currentXP,
        total_xp: newTotalXP,
      })
      .eq('user_id', supabaseUserId)

    if (error) {
      console.error('Error updating progress:', error)
      return
    }

    setProgress(updatedProgress)

    if (newLevel > progress.level) {
      alert(`🎉 Level Up! You're now level ${newLevel}!`)
    }
  }

  return (
    <UserProgressContext.Provider value={{ userProgress: progress, addXP, loading }}>
      {children}
    </UserProgressContext.Provider>
  )
}