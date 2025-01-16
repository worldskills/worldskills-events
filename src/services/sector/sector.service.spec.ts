import {TestBed} from '@angular/core/testing';

import {SectorService} from './sector.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('SectorService', () => {
  let service: SectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [], providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()] });
    service = TestBed.inject(SectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
