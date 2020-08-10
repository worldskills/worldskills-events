import {TestBed} from '@angular/core/testing';

import {BaseSectorsService} from './base-sectors.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('BaseSectorsService', () => {
  let service: BaseSectorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(BaseSectorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
