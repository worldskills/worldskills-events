import {TestBed} from '@angular/core/testing';

import {SkillTagService} from './skill-tag.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('SkillTagService', () => {
  let service: SkillTagService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [], providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()] });
    service = TestBed.inject(SkillTagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
