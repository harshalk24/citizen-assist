"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { CitizenContextData } from "@/types/context"

interface CitizenCtx {
  citizen: CitizenContextData | null
  setCitizen: (c: CitizenContextData | null) => void
  sessionId: string
  isLoading: boolean
  // Returns the fresh data so callers can use it immediately
  // without waiting for the React state update cycle
  refresh: () => Promise<CitizenContextData | null>
}

const CitizenCtxDefault: CitizenCtx = {
  citizen: null,
  setCitizen: () => {},
  sessionId: "",
  isLoading: true,
  refresh: async () => null,
}

const CitizenContext = createContext<CitizenCtx>(CitizenCtxDefault)

function generateSessionId() {
  return `sess_${Date.now()}_${Math.random().toString(36).slice(2)}`
}

export function CitizenProvider({ children }: { children: ReactNode }) {
  const [citizen, setCitizen] = useState<CitizenContextData | null>(null)
  const [sessionId, setSessionId] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  const refresh = async (): Promise<CitizenContextData | null> => {
    const citizenId = localStorage.getItem("ca_citizen_id")
    if (!citizenId) { setIsLoading(false); return null }
    try {
      const res = await fetch("/api/citizen/me", {
        headers: { "x-citizen-id": citizenId }
      })
      if (res.ok) {
        const raw = await res.json()
        // Parse the nested API response into a flat CitizenContextData
        const planData = raw.actionPlan?.planJson ? JSON.parse(raw.actionPlan.planJson) : null
        const planSteps = planData?.weeks
          ? planData.weeks.flatMap((w: any) =>
              w.steps.map((s: any) => ({ ...s, week: w.week, status: s.status || "not-started" }))
            )
          : Array.isArray(planData) ? planData : []
        const data: CitizenContextData = {
          citizenId: raw.citizen.id,
          profile: {
            firstName:  raw.citizen.firstName || "there",
            country:    raw.citizen.country,
            employment: raw.context?.employment || "any",
            lifeEvent:  raw.context?.lifeEvent  || "",
            language:   (raw.citizen.language as "en" | "es") || "en",
            email:      raw.citizen.email || undefined,
          },
          entitlements:        raw.context?.entitlementsJson ? JSON.parse(raw.context.entitlementsJson) : [],
          planSteps,
          deadlines:           raw.deadlines || [],
          conversationSummary: raw.context?.conversationSummary || undefined,
          lastUpdated:         new Date().toISOString(),
          planUpdatedAt:       raw.actionPlan?.updatedAt,
          planLifeEvent:       raw.actionPlan?.lifeEvent || undefined,
        }
        setCitizen(data)
        return data
      }
    } catch {
      // ignore
    } finally {
      setIsLoading(false)
    }
    return null
  }

  useEffect(() => {
    let sid = localStorage.getItem("ca_session_id")
    if (!sid) {
      sid = generateSessionId()
      localStorage.setItem("ca_session_id", sid)
    }
    setSessionId(sid)
    refresh()
  }, [])

  return (
    <CitizenContext.Provider value={{ citizen, setCitizen, sessionId, isLoading, refresh }}>
      {children}
    </CitizenContext.Provider>
  )
}

export const useCitizen = () => useContext(CitizenContext)
