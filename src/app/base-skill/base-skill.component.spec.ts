import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseSkillComponent } from './base-skill.component';

describe('BaseSkillComponent', () => {
  let component: BaseSkillComponent;
  let fixture: ComponentFixture<BaseSkillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseSkillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
