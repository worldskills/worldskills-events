import { TestBed } from '@angular/core/testing';

import { BaseSkillsService } from './base-skills.service';

describe('BaseSkillsService', () => {
  let service: BaseSkillsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseSkillsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
