import {TestBed} from '@angular/core/testing';

import {UiSkillService} from './ui-skill.service';

describe('UiSkillService', () => {
  let service: UiSkillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiSkillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
