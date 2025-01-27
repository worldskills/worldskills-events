import {TestBed} from '@angular/core/testing';

import {BaseSkillsService} from './base-skills.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('BaseSkillsService', () => {
  let service: BaseSkillsService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [], providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()] });
    service = TestBed.inject(BaseSkillsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
