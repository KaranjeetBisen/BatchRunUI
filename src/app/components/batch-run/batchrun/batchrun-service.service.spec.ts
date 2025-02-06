import { TestBed } from '@angular/core/testing';

import { BatchrunServiceService } from './batchrun-service.service';

describe('BatchrunServiceService', () => {
  let service: BatchrunServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BatchrunServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
