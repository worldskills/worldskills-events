import {TestBed} from '@angular/core/testing';

import {SkillSponsorService} from './skill-sponsor.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('SkillSponsorService', () => {
  let service: SkillSponsorService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [], providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()] });
    service = TestBed.inject(SkillSponsorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
