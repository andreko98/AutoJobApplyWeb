import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { ApplicationsComponent } from './pages/applications/applications.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Importação do novo componente
import { JobSearchComponent } from './components/job-search/job-search.component';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    JobsComponent,
    ApplicationsComponent,
    LoginComponent,
    HomeComponent,
    JobSearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}