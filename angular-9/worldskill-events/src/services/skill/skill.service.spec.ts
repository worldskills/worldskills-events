import {TestBed} from '@angular/core/testing';

import {SkillService} from './skill.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SkillService', () => {
  let service: SkillService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(SkillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
