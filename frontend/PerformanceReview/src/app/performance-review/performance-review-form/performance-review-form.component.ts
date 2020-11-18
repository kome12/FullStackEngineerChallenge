import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AppComponentService } from '../../app-component.service';
import { Employee } from '../../employee/employee.model';
import { PerformanceReview } from '../performanceReview.model';

@Component({
  selector: 'app-performance-review-form',
  templateUrl: './performance-review-form.component.html',
  styleUrls: ['./performance-review-form.component.scss']
})
export class PerformanceReviewFormComponent implements OnInit, OnChanges {
    @Input() selectedPerformanceReview: PerformanceReview;
    @Input() employees: Array<Employee>;
    @Output() closeFormEvent: EventEmitter<void> = new EventEmitter<void>();
    @Output() savePerformanceReviewEvent: EventEmitter<PerformanceReview> = new EventEmitter<PerformanceReview>();

    performanceReviewForm: FormGroup;
    prForEmployeeList: Array<Employee>;
    requestedToEmployeeList: Array<Employee>;

    currentLoggedInUser: Employee;

  constructor(
      public fb: FormBuilder,
      private appComponentService: AppComponentService,
  ) {
      this.createForm();
  }

  createForm(): void {
      this.performanceReviewForm = this.fb.group({
          prForId: ['', Validators.required],
          prFromId: ['', Validators.required],
          requestedToId: ['', Validators.required],
          comment: [''],
      });
  }

  ngOnInit(): void {
      this.currentLoggedInUser = this.appComponentService.getLoggedInUser();
      this.resetForm();
  }

  ngOnChanges(): void {
      this.resetForm();
  }

  resetForm(): void {
      this.prForEmployeeList = this.employees;
      this.requestedToEmployeeList = this.employees;
      this.performanceReviewForm.reset({
          prForId: this.selectedPerformanceReview ? this.selectedPerformanceReview.prForId : '',
          prFromId: this.selectedPerformanceReview ? this.selectedPerformanceReview.prFromId : this.currentLoggedInUser ? this.currentLoggedInUser._id : '',
          requestedToId: this.selectedPerformanceReview ? this.selectedPerformanceReview.requestedToId : '',
          comment: this.selectedPerformanceReview ? this.selectedPerformanceReview.comment : '',
      });
  }

  closeForm(): void {
      this.closeFormEvent.emit();
  }

  updateRequestedToId(event: any): void {
      console.log('event in updateRequestedToId:', event)
      const selectedId = event.value;
      this.requestedToEmployeeList = this.removeIdFromEmployeeList(selectedId);
  }

  updatePRForEmployeeList(event: any): void {
      console.log('event in updatedPRForEmployeeList:', event)
      const selectedId = event.value;
      this.prForEmployeeList = this.removeIdFromEmployeeList(selectedId);
  }

  removeIdFromEmployeeList(id: string): Array<Employee> {
      return this.employees.filter((employee: Employee) => employee._id !== id);
  }

  savePerformanceReview(): void {
      const performanceReviewFormModel = this.performanceReviewForm.value;
      const newPerformanceReview: PerformanceReview = new PerformanceReview(performanceReviewFormModel);
      this.savePerformanceReviewEvent.emit(newPerformanceReview);
  }
}
