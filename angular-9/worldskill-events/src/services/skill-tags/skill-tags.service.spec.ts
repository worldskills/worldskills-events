import {TestBed} from '@angular/core/testing';

import {SkillTagsService} from './skill-tags.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SkillTagsService', () => {
  let service: SkillTagsService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(SkillTagsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
