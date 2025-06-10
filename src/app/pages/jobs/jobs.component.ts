import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobService } from '../../services/jobs/job.service';
import { ApplicationService } from '../../services/applications/application.service';
import { Job } from '../../models/jobs/jobs.model';
import { JobSearchComponent } from '../../components/job-search/job-search.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, JobSearchComponent]
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