import type { Job } from '../types'

// ---- TEMPORARY MOCK IMPLEMENTATION ----
// I will replace these with real HTTP calls later.

let MOCK_JOBS: Job[] = [
  {
    id: 'JOB-1001',
    companyId: 'default',
    title: 'Install gate motor',
    customerName: 'Acme Estates',
    address: '123 Main Rd, Johannesburg',
    currentStatus: 'NEW',
    priority: 'normal',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'JOB-1002',
    companyId: 'default',
    title: 'Fix tripping circuit',
    customerName: 'Jane D',
    address: '7 Kudu Ave, Randburg',
    currentStatus: 'ASSIGNED',
    priority: 'high',
    assignedTo: 'TECH-001',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const Api = {
  // list jobs (mock)
  async listJobs(): Promise<Job[]> {
    // simulate network delay
    await new Promise(r => setTimeout(r, 300));
    // latest first
    return [...MOCK_JOBS].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  },

  // create job (mock)
  async createJob(payload: Partial<Job>): Promise<Job> {
    await new Promise(r => setTimeout(r, 200));
    const now = new Date().toISOString();
    const job: Job = {
      id: `JOB-${1000 + MOCK_JOBS.length + 1}`,
      companyId: 'default',
      title: payload.title || 'Untitled Job',
      description: payload.description,
      customerName: payload.customerName,
      address: payload.address,
      currentStatus: 'NEW',
      priority: payload.priority || 'normal',
      createdAt: now,
      updatedAt: now
    };
    MOCK_JOBS = [job, ...MOCK_JOBS];
    return job;
  }
};
