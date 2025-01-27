import {TestBed} from '@angular/core/testing';

import {BaseSectorsService} from './base-sectors.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('BaseSectorsService', () => {
  let service: BaseSectorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [], providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()] });
    service = TestBed.inject(BaseSectorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
