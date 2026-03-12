export type JobStatus = 'new' | 'scheduled' | 'in_progress' | 'completed'

export interface Job {
  id: string
  customerName: string
  serviceType: string
  status: JobStatus
  scheduledDate: string | null
  address: string
  notes: string
  createdAt: string
}