import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillPhotoUpdateComponent } from './skill-photo-update.component';

describe('SkillPhotoUpdateComponent', () => {
  let component: SkillPhotoUpdateComponent;
  let fixture: ComponentFixture<SkillPhotoUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillPhotoUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillPhotoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
