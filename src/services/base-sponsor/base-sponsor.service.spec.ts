import {TestBed} from '@angular/core/testing';

import {BaseSponsorService} from './base-sponsor.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('BaseSponsorService', () => {
  let service: BaseSponsorService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(BaseSponsorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
