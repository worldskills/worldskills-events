import {TestBed} from '@angular/core/testing';

import {BaseSponsorsService} from './base-sponsors.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('BaseSponsorsService', () => {
  let service: BaseSponsorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [], providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()] });
    service = TestBed.inject(BaseSponsorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
