import {TestBed} from '@angular/core/testing';

import {HttpInterceptorService} from './http-interceptor.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService, NgAuthService} from '@worldskills/worldskills-angular-lib';
import {TranslateServiceTestingProvider} from "../../test";

describe('HttpInterceptorService', () => {
  let service: HttpInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        TranslateServiceTestingProvider,
        {provide: AuthService, useValue: {}},
        {provide: NgAuthService, useValue: {currentUser: {subscribe: () => undefined}}},
      ],
    });
    service = TestBed.inject(HttpInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
