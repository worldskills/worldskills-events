import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseSkillsComponent } from './base-skills.component';

describe('BaseSkillsComponent', () => {
  let component: BaseSkillsComponent;
  let fixture: ComponentFixture<BaseSkillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseSkillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
