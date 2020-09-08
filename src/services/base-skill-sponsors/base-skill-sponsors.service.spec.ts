import {TestBed} from '@angular/core/testing';

import {BaseSkillSponsorsService} from './base-skill-sponsors.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('BaseSkillSponsorsService', () => {
  let service: BaseSkillSponsorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(BaseSkillSponsorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
