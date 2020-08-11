import {TestBed} from '@angular/core/testing';

import {SkillSponsorService} from './skill-sponsor.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SkillSponsorService', () => {
  let service: SkillSponsorService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(SkillSponsorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
