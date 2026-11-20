import { useState, useEffect } from 'react'
import type { Profile, SkillCategory, Project, TimelineEntry, Achievement } from '../types'
import { profile as defaultProfile } from '../data/profile'
import { skillCategories as defaultSkills } from '../data/skills'
import { projects as defaultProjects } from '../data/projects'
import { experience as defaultExp, education as defaultEdu } from '../data/experience'
import { achievements as defaultAchievements } from '../data/achievements'

const PROFILE_KEY = 'portfolio_custom_profile'
const SKILLS_KEY = 'portfolio_custom_skills'
const PROJECTS_KEY = 'portfolio_custom_projects'
const EXP_KEY = 'portfolio_custom_experience'
const EDU_KEY = 'portfolio_custom_education'
const ACHIEVEMENTS_KEY = 'portfolio_custom_achievements'
const PORTFOLIO_UPDATE_EVENT = 'portfolio-data-updated'

function getFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    const parsed = JSON.parse(raw)
    return parsed ?? fallback
  } catch {
    return fallback
  }
}

function setToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(key, JSON.stringify(value))
    window.dispatchEvent(new Event(PORTFOLIO_UPDATE_EVENT))
  } catch (err) {
    console.error(`Failed to save to ${key}:`, err)
  }
}

// ── Read Helpers ──
export const getStoredProfile = (): Profile => getFromStorage(PROFILE_KEY, defaultProfile)
export const getStoredSkills = (): SkillCategory[] => getFromStorage(SKILLS_KEY, defaultSkills)
export const getStoredProjects = (): Project[] => getFromStorage(PROJECTS_KEY, defaultProjects)
export const getStoredExperience = (): TimelineEntry[] => getFromStorage(EXP_KEY, defaultExp)
export const getStoredEducation = (): TimelineEntry[] => getFromStorage(EDU_KEY, defaultEdu)
export const getStoredAchievements = (): Achievement[] => getFromStorage(ACHIEVEMENTS_KEY, defaultAchievements)

// ── Save Helpers ──
export const saveStoredProfile = (data: Profile) => setToStorage(PROFILE_KEY, data)
export const saveStoredSkills = (data: SkillCategory[]) => setToStorage(SKILLS_KEY, data)
export const saveStoredProjects = (data: Project[]) => setToStorage(PROJECTS_KEY, data)
export const saveStoredExperience = (data: TimelineEntry[]) => setToStorage(EXP_KEY, data)
export const saveStoredEducation = (data: TimelineEntry[]) => setToStorage(EDU_KEY, data)
export const saveStoredAchievements = (data: Achievement[]) => setToStorage(ACHIEVEMENTS_KEY, data)

// ── Reset Helpers ──
export const resetStoredProfile = () => saveStoredProfile(defaultProfile)
export const resetStoredSkills = () => saveStoredSkills(defaultSkills)
export const resetStoredProjects = () => saveStoredProjects(defaultProjects)
export const resetStoredExperience = () => saveStoredExperience(defaultExp)
export const resetStoredEducation = () => saveStoredEducation(defaultEdu)
export const resetStoredAchievements = () => saveStoredAchievements(defaultAchievements)

// ── Reactive React Hooks ──
export function useProfile(): Profile {
  const [data, setData] = useState<Profile>(getStoredProfile)
  useEffect(() => {
    const refresh = () => setData(getStoredProfile())
    window.addEventListener(PORTFOLIO_UPDATE_EVENT, refresh)
    window.addEventListener('storage', refresh)
    return () => {
      window.removeEventListener(PORTFOLIO_UPDATE_EVENT, refresh)
      window.removeEventListener('storage', refresh)
    }
  }, [])
  return data
}

export function useSkills(): SkillCategory[] {
  const [data, setData] = useState<SkillCategory[]>(getStoredSkills)
  useEffect(() => {
    const refresh = () => setData(getStoredSkills())
    window.addEventListener(PORTFOLIO_UPDATE_EVENT, refresh)
    window.addEventListener('storage', refresh)
    return () => {
      window.removeEventListener(PORTFOLIO_UPDATE_EVENT, refresh)
      window.removeEventListener('storage', refresh)
    }
  }, [])
  return data
}

export function useProjects(): Project[] {
  const [data, setData] = useState<Project[]>(getStoredProjects)
  useEffect(() => {
    const refresh = () => setData(getStoredProjects())
    window.addEventListener(PORTFOLIO_UPDATE_EVENT, refresh)
    window.addEventListener('storage', refresh)
    return () => {
      window.removeEventListener(PORTFOLIO_UPDATE_EVENT, refresh)
      window.removeEventListener('storage', refresh)
    }
  }, [])
  return data
}

export function useExperience(): { experience: TimelineEntry[]; education: TimelineEntry[] } {
  const [exp, setExp] = useState<TimelineEntry[]>(getStoredExperience)
  const [edu, setEdu] = useState<TimelineEntry[]>(getStoredEducation)
  useEffect(() => {
    const refresh = () => {
      setExp(getStoredExperience())
      setEdu(getStoredEducation())
    }
    window.addEventListener(PORTFOLIO_UPDATE_EVENT, refresh)
    window.addEventListener('storage', refresh)
    return () => {
      window.removeEventListener(PORTFOLIO_UPDATE_EVENT, refresh)
      window.removeEventListener('storage', refresh)
    }
  }, [])
  return { experience: exp, education: edu }
}

export function useAchievements(): Achievement[] {
  const [data, setData] = useState<Achievement[]>(getStoredAchievements)
  useEffect(() => {
    const refresh = () => setData(getStoredAchievements())
    window.addEventListener(PORTFOLIO_UPDATE_EVENT, refresh)
    window.addEventListener('storage', refresh)
    return () => {
      window.removeEventListener(PORTFOLIO_UPDATE_EVENT, refresh)
      window.removeEventListener('storage', refresh)
    }
  }, [])
  return data
}
