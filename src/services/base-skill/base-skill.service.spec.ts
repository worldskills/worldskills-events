import {TestBed} from '@angular/core/testing';

import {BaseSkillService} from './base-skill.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('BaseSkillService', () => {
  let service: BaseSkillService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [], providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()] });
    service = TestBed.inject(BaseSkillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
