import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './app-guard.service';
import { LoginComponent } from './login/login.component';
import { EmployeeComponent } from './employee/employee.component';
import { PerformanceReviewComponent } from './performance-review/performance-review.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'employee',
        component: EmployeeComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'performanceReview',
        component: PerformanceReviewComponent,
        canActivate: [AuthGuard],
    },
    {
        path: '',
        redirectTo: '/employee',
        pathMatch: 'full',
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
      AuthGuard
  ]
})
export class AppRoutingModule { }
