import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillCopyComponent } from './skill-copy.component';

describe('SkillCopyComponent', () => {
  let component: SkillCopyComponent;
  let fixture: ComponentFixture<SkillCopyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillCopyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
