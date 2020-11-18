import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { PerformanceReviewComponent } from './performance-review.component';

describe('PerformanceReviewComponent', () => {
  let component: PerformanceReviewComponent;
  let fixture: ComponentFixture<PerformanceReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
            BrowserAnimationsModule,
            HttpClientModule,
            RouterTestingModule,
            MatPaginatorModule,
            MatTableModule,
        ],
      declarations: [ PerformanceReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
