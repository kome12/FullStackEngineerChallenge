import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { PerformanceReviewService } from './performance-review.service';

describe('PerformanceReviewService', () => {
  let service: PerformanceReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [ HttpClientModule ],
    });
    service = TestBed.inject(PerformanceReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
