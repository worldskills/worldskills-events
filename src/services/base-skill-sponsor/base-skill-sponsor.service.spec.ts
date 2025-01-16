import {TestBed} from '@angular/core/testing';

import {BaseSkillSponsorService} from './base-skill-sponsor.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('BaseSkillSponsorService', () => {
  let service: BaseSkillSponsorService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [], providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()] });
    service = TestBed.inject(BaseSkillSponsorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
