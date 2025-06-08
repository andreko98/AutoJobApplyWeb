import { Job } from "../jobs/jobs.model";
import { User } from "../users/user.model";

export interface Application {
  id: number;
  userId: number;
  jobId: number;
  appliedAt: string; // ou Date
  messageSent: string;
  status: string;
  user?: User;
  job?: Job;
}
