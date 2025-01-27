import {TestBed} from '@angular/core/testing';

import {HttpInterceptorService} from './http-interceptor.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService, NgAuthService} from '@worldskills/worldskills-angular-lib';
import {TranslateServiceTestingProvider} from "../../test";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('HttpInterceptorService', () => {
  let service: HttpInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    providers: [
        TranslateServiceTestingProvider,
        { provide: AuthService, useValue: {} },
        { provide: NgAuthService, useValue: { currentUser: { subscribe: () => undefined } } },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
    ]
});
    service = TestBed.inject(HttpInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
