import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobService } from '../../services/jobs/job.service';
import { ApplicationService } from '../../services/applications/application.service';
import { Job } from '../../models/jobs/jobs.model';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class JobsComponent implements OnInit {
  jobs: Job[] = [];
  userId = 1;

  constructor(private jobService: JobService, private appService: ApplicationService) {}

  ngOnInit() {
    this.getAllJobs();
  }

  getAllJobs() {
    this.jobService.getAll().subscribe(data => this.jobs = data);
  }

  apply(jobId: number) {
    this.appService.apply(this.userId, jobId).subscribe();
  }

  onSearchCompleted(total: number) {
    alert(`Busca concluída! Total de vagas encontradas: ${total}`);

    this.getAllJobs();
  }
}