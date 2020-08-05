import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillPhotoCreateComponent } from './skill-photo-create.component';

describe('SkillPhotoCreateComponent', () => {
  let component: SkillPhotoCreateComponent;
  let fixture: ComponentFixture<SkillPhotoCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillPhotoCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillPhotoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
