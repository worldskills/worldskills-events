import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillUpdateComponent } from './skill-update.component';

describe('SkillUpdateComponent', () => {
  let component: SkillUpdateComponent;
  let fixture: ComponentFixture<SkillUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
