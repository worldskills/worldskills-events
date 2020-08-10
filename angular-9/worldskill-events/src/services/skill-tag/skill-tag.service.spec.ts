import {TestBed} from '@angular/core/testing';

import {SkillTagService} from './skill-tag.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SkillTagService', () => {
  let service: SkillTagService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(SkillTagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
