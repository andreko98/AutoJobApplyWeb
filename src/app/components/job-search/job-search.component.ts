import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { JobService } from '../../services/jobs/job.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-job-search',
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class JobSearchComponent {
  searchTerm = '';
  loading = false;

  @Output() searchCompleted = new EventEmitter<number>();

  constructor(private jobService: JobService) {}

  searchJobs() {
    if (!this.searchTerm) return;
    this.loading = true;
    this.jobService.scrapeJobs(this.searchTerm)
      .subscribe({
        next: (res) => {
          this.searchCompleted.emit(res.total);
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
  }
}