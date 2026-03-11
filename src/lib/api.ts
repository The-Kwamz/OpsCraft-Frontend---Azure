import type { Job } from '../types'

// Base URL comes from .env.production (VITE_API_BASE_URL=.../api)
const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '')

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {})
    },
    // include credentials only if you later enable auth/cookies; for now keep default
    ...init
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`API ${res.status} ${res.statusText} – ${text}`)
  }
  return res.json() as Promise<T>
}

export const Api = {
  // GET /jobs  -> returns Job[]
  listJobs: () => request<Job[]>('/jobs'),

  // POST /jobs -> body: Partial<Job>, returns Job
  createJob: (payload: Partial<Job>) =>
    request<Job>('/jobs', {
      method: 'POST',
      body: JSON.stringify(payload)
    })
}