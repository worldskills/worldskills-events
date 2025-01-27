import {TestBed} from '@angular/core/testing';

import {CountriesService} from './countries.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('CountriesService', () => {
  let service: CountriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [], providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()] });
    service = TestBed.inject(CountriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
