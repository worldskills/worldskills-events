import {TestBed} from '@angular/core/testing';

import {BaseSkillTagService} from './base-skill-tag.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('BaseSkillTagService', () => {
  let service: BaseSkillTagService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [], providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()] });
    service = TestBed.inject(BaseSkillTagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
