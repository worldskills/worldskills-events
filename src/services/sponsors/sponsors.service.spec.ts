import {TestBed} from '@angular/core/testing';

import {SponsorsService} from './sponsors.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SkillSponsorsService', () => {
  let service: SponsorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(SponsorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
