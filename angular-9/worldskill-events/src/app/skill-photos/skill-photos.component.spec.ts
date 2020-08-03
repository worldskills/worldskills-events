import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillPhotosComponent } from './skill-photos.component';

describe('SkillPhotosComponent', () => {
  let component: SkillPhotosComponent;
  let fixture: ComponentFixture<SkillPhotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillPhotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
