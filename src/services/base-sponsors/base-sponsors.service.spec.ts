import {TestBed} from '@angular/core/testing';

import {BaseSponsorsService} from './base-sponsors.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('BaseSponsorsService', () => {
  let service: BaseSponsorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(BaseSponsorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
