import {TestBed} from '@angular/core/testing';

import {BaseSkillTagsService} from './base-skill-tags.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('BaseSkillTagsService', () => {
  let service: BaseSkillTagsService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [], providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()] });
    service = TestBed.inject(BaseSkillTagsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
