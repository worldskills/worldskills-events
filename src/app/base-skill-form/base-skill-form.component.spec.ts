import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseSkillFormComponent } from './base-skill-form.component';

describe('BaseSkillFormComponent', () => {
  let component: BaseSkillFormComponent;
  let fixture: ComponentFixture<BaseSkillFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseSkillFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseSkillFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
