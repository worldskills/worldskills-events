import {TestBed} from '@angular/core/testing';

import {SectorsService} from './sectors.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SectorsService', () => {
  let service: SectorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(SectorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
