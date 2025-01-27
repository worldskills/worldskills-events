import {TestBed} from '@angular/core/testing';

import {TagService} from './tag.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('TagService', () => {
  let service: TagService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [], providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()] });
    service = TestBed.inject(TagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
