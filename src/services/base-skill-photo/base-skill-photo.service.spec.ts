import {TestBed} from '@angular/core/testing';

import {BaseSkillPhotoService} from './base-skill-photo.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('BaseSkillPhotoService', () => {
  let service: BaseSkillPhotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [], providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()] });
    service = TestBed.inject(BaseSkillPhotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
