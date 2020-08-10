import {TestBed} from '@angular/core/testing';

import {SponsorService} from './sponsor.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SponsorService', () => {
  let service: SponsorService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(SponsorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
