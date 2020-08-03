import {TestBed} from '@angular/core/testing';

import {SkillSponsorsService} from './skill-sponsors.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SkillSponsorsService', () => {
  let service: SkillSponsorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(SkillSponsorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
