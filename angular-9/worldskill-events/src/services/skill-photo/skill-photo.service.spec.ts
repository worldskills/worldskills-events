import { TestBed } from '@angular/core/testing';

import { SkillPhotoService } from './skill-photo.service';

describe('SkillPhotoService', () => {
  let service: SkillPhotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillPhotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
