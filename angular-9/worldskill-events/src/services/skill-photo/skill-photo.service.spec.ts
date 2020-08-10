import {TestBed} from '@angular/core/testing';

import {SkillPhotoService} from './skill-photo.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SkillPhotoService', () => {
  let service: SkillPhotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(SkillPhotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
