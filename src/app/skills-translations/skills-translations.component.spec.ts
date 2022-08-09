import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsTranslationsComponent } from './skills-translations.component';

describe('SkillsTranslationsComponent', () => {
  let component: SkillsTranslationsComponent;
  let fixture: ComponentFixture<SkillsTranslationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillsTranslationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsTranslationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
