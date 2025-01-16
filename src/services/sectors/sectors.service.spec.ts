import {TestBed} from '@angular/core/testing';

import {SectorsService} from './sectors.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('SectorsService', () => {
  let service: SectorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [], providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()] });
    service = TestBed.inject(SectorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
