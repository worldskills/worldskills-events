import {TestBed} from '@angular/core/testing';

import {BaseSkillTagService} from './base-skill-tag.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('BaseSkillTagService', () => {
  let service: BaseSkillTagService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(BaseSkillTagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
