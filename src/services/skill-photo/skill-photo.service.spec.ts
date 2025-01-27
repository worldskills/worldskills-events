import {TestBed} from '@angular/core/testing';

import {SkillPhotoService} from './skill-photo.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('SkillPhotoService', () => {
  let service: SkillPhotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [], providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()] });
    service = TestBed.inject(SkillPhotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
