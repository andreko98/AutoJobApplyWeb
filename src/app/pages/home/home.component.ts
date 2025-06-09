import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobService } from '../../services/jobs/job.service';
import { ApplicationService } from '../../services/applications/application.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class HomeComponent implements OnInit {
  recentJobs: any[] = [];
  recentApplications: any[] = [];

  constructor(
    private jobService: JobService,
    private applicationService: ApplicationService
  ) {}

  ngOnInit() {
    this.jobService.getRecentJobs().subscribe(jobs => this.recentJobs = jobs);
    this.applicationService.getRecentApplications().subscribe(apps => this.recentApplications = apps);
  }
}