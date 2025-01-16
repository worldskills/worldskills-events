import {TestBed} from '@angular/core/testing';

import {SponsorsService} from './sponsors.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('SkillSponsorsService', () => {
  let service: SponsorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [], providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()] });
    service = TestBed.inject(SponsorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
