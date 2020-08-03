import {TestBed} from '@angular/core/testing';

import {SkillSponsorService} from './skill-sponsor.service';

describe('SkillSponsorService', () => {
  let service: SkillSponsorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillSponsorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
