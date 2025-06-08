import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../services/applications/application.service';

@Component({ selector: 'app-applications', templateUrl: './applications.component.html' })
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
