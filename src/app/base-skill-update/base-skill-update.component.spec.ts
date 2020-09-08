import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseSkillUpdateComponent } from './base-skill-update.component';

describe('BaseSkillUpdateComponent', () => {
  let component: BaseSkillUpdateComponent;
  let fixture: ComponentFixture<BaseSkillUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseSkillUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseSkillUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
