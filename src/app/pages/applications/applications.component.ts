import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationService } from '../../services/applications/application.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ApplicationsComponent implements OnInit {
  applications: any[] = [];
  userId = 1; // ou recupere dinamicamente se tiver login

  constructor(private appService: ApplicationService) {}

  ngOnInit() {
    this.appService.getByUser(this.userId).subscribe(data => {
      this.applications = data;
    });
  }
}
