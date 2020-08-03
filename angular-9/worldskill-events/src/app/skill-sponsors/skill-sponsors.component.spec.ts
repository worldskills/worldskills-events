import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillSponsorsComponent } from './skill-sponsors.component';

describe('SkillSponsorsComponent', () => {
  let component: SkillSponsorsComponent;
  let fixture: ComponentFixture<SkillSponsorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillSponsorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillSponsorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
