import type { Job } from '../types'

const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '')

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    ...init,
  })

  if (!response.ok) {
    const text = await response.text().catch(() => '')
    throw new Error(`API ${response.status} ${response.statusText} – ${text}`)
  }

  const contentType = response.headers.get('content-type') || ''

  if (!contentType.includes('application/json')) {
    const text = await response.text().catch(() => '')
    throw new Error(`Expected JSON response but received: ${text}`)
  }

  return response.json() as Promise<T>
}

export const Api = {
  listJobs: () => request<Job[]>('/jobs'),

  createJob: (payload: Partial<Job>) =>
    request<Job>('/jobs', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  getJob: async (id: string) => {
    const jobs = await request<Job[]>('/jobs')
    const job = jobs.find((item) => item.id === id)

    if (!job) {
      throw new Error('Job not found')
    }

    return job
  },
}