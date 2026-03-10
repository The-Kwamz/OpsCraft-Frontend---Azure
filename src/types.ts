export type JobStatus =
  | 'NEW' | 'QUALIFIED' | 'SCHEDULED' | 'ASSIGNED' | 'EN_ROUTE'
  | 'IN_PROGRESS' | 'PAUSED' | 'COMPLETED' | 'QUALITY_CHECK'
  | 'INVOICED' | 'CLOSED'

export interface Job {
  id: string
  companyId: string            // for now l'll use "default"
  title: string
  description?: string
  customerName?: string
  customerPhone?: string
  address?: string
  assignedTo?: string
  currentStatus: JobStatus
  priority?: 'low' | 'normal' | 'high'
  createdAt: string            // These are ISO timestamps
  updatedAt: string
}