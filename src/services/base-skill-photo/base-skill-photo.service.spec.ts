import {TestBed} from '@angular/core/testing';

import {BaseSkillPhotoService} from './base-skill-photo.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('BaseSkillPhotoService', () => {
  let service: BaseSkillPhotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(BaseSkillPhotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
