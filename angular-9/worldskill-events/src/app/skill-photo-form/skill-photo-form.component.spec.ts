import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillPhotoFormComponent } from './skill-photo-form.component';

describe('SkillPhotoFormComponent', () => {
  let component: SkillPhotoFormComponent;
  let fixture: ComponentFixture<SkillPhotoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillPhotoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillPhotoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
