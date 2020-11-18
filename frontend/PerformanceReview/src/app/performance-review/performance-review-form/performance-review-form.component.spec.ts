import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { PerformanceReviewFormComponent } from './performance-review-form.component';

describe('PerformanceReviewFormComponent', () => {
  let component: PerformanceReviewFormComponent;
  let fixture: ComponentFixture<PerformanceReviewFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
            BrowserAnimationsModule,
            ReactiveFormsModule,
            RouterTestingModule,
            MatFormFieldModule,
            MatInputModule,
            MatSelectModule,
        ],
      declarations: [ PerformanceReviewFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceReviewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
