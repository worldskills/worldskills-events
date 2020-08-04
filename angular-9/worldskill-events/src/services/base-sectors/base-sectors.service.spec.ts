import { TestBed } from '@angular/core/testing';

import { BaseSectorsService } from './base-sectors.service';

describe('BaseSectorsService', () => {
  let service: BaseSectorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseSectorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
