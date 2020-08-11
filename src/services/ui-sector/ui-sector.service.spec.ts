import {TestBed} from '@angular/core/testing';

import {UiSectorService} from './ui-sector.service';

describe('UiSectorService', () => {
  let service: UiSectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiSectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
