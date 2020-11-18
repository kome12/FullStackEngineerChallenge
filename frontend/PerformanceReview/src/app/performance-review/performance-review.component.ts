import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';

import { Employee } from '../employee/employee.model';
import { EmployeeService } from '../employee/employee.service';
import { PerformanceReview } from './performanceReview.model';
import { PerformanceReviewService } from './performance-review.service';

@Component({
  selector: 'app-performance-review',
  templateUrl: './performance-review.component.html',
  styleUrls: ['./performance-review.component.scss']
})
export class PerformanceReviewComponent implements OnInit {
    performanceReviews: Array<PerformanceReview>;
    employees: Array<Employee>;
    displayPerformanceReviewForm: boolean;
    selectedPerformanceReview: PerformanceReview;

    tableColumns: Array<string> = [
        'prFor',
        'prFrom',
        'requestedTo',
        'comment',
    ];

  constructor(
      private employeeService: EmployeeService,
      private performanceReviewService: PerformanceReviewService,
  ) { }

  ngOnInit(): void {
      this.loadData();
  }

  loadData(): void {
      const forkJoinList: Array<Observable<any>> = [
          this.getPerformanceReviews(),
          this.getEmployees(),
      ];
      forkJoin(forkJoinList).subscribe((results: Array<any>) => {
          const performanceReviewResult: any = results[0];
          const employeeResult: any = results[1];
          if (employeeResult && employeeResult.data) {
              this.employees = employeeResult.data.map((employee: Employee) => new Employee(employee));
          }
          this.mapPerformanceReview(performanceReviewResult);
      });
  }

  getPerformanceReviews(): Observable<any> {
      return this.performanceReviewService.getPerformanceReviews();
  }

  getPerformanceReviewsAndPopulate(): void {
      this.getPerformanceReviews().subscribe((result: any) => {
          this.mapPerformanceReview(result);
      });
  }

  mapPerformanceReview(result: any): void {
      if (result && result.data) {
          this.performanceReviews = result.data.map((performanceReview: PerformanceReview) => {
              const newPerformanceReview = new PerformanceReview(performanceReview);
              newPerformanceReview.populateEmployeeIds(this.employees);
              return newPerformanceReview;
          });
      }
  }

  getEmployees(): Observable<any> {
      return this.employeeService.getEmployees();
  }

  createNewPerformanceReview(): void {
      this.displayPerformanceReviewForm = true;
  }

  closeForm(): void {
      this.displayPerformanceReviewForm = false;
      this.selectedPerformanceReview = null;
  }

  selectedRow(performanceReview: PerformanceReview): void {
      this.selectedPerformanceReview = performanceReview;
      this.displayPerformanceReviewForm = true;
  }

  savePerformanceReview(performanceReview: PerformanceReview): void {
      if (this.selectedPerformanceReview && this.selectedPerformanceReview._id) {
          performanceReview._id = this.selectedPerformanceReview._id;
          this.performanceReviewService.updatePerformanceReview(performanceReview)
              .subscribe((result: any) => {
                  console.log('result from update:', result)
                  this.closeForm();
                  this.getPerformanceReviewsAndPopulate();
              });
      }
      else {
          this.performanceReviewService.createPerformanceReview(performanceReview)
            .subscribe((result: any) => {
                console.log('result from create:', result)
                this.closeForm();
                this.getPerformanceReviewsAndPopulate();
            });
      }
  }
}
