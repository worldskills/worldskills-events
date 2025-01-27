import {TestBed} from '@angular/core/testing';

import {BaseSponsorService} from './base-sponsor.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('BaseSponsorService', () => {
  let service: BaseSponsorService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [], providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()] });
    service = TestBed.inject(BaseSponsorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
