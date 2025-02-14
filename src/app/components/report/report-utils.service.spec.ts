import { TestBed } from '@angular/core/testing';

import { ReportUtilsService } from './report-utils.service';

describe('ReportUtilsService', () => {
  let service: ReportUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
