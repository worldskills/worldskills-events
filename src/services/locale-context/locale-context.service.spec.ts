import {TestBed} from '@angular/core/testing';

import {LocaleContextService} from './locale-context.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {TranslateServiceTestingProvider} from '../../test';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('LocaleContextService', () => {
  let service: LocaleContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [TranslateServiceTestingProvider, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(LocaleContextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
