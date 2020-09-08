import {TestBed} from '@angular/core/testing';

import {BaseSkillTagsService} from './base-skill-tags.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('BaseSkillTagsService', () => {
  let service: BaseSkillTagsService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(BaseSkillTagsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
