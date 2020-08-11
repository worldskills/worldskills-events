import {TestBed} from '@angular/core/testing';

import {SectorService} from './sector.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SectorService', () => {
  let service: SectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(SectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
