import {TestBed} from '@angular/core/testing';

import {BaseSkillsService} from './base-skills.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('BaseSkillsService', () => {
  let service: BaseSkillsService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(BaseSkillsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
