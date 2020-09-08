import {TestBed} from '@angular/core/testing';

import {BaseSkillSponsorService} from './base-skill-sponsor.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('BaseSkillSponsorService', () => {
  let service: BaseSkillSponsorService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(BaseSkillSponsorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
