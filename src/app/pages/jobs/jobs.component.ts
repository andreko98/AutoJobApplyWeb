import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/jobs/job.service';
import { ApplicationService } from '../../services/applications/application.service';
import { Job } from '../../models/jobs/jobs.model';

@Component({ selector: 'app-jobs', templateUrl: './jobs.component.html' })
export class JobsComponent implements OnInit {
  jobs: Job[] = [];
  userId = 1;

  constructor(private jobService: JobService, private appService: ApplicationService) {}

  ngOnInit() {
    this.jobService.getAll().subscribe(data => this.jobs = data);
  }

  apply(jobId: number) {
    this.appService.apply(this.userId, jobId).subscribe();
  }
}