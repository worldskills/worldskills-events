import {TestBed} from '@angular/core/testing';

import {BaseSkillService} from './base-skill.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('BaseSkillService', () => {
  let service: BaseSkillService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(BaseSkillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
