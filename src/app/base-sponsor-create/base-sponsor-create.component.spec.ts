import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseSponsorCreateComponent } from './base-sponsor-create.component';

describe('BaseSponsorCreateComponent', () => {
  let component: BaseSponsorCreateComponent;
  let fixture: ComponentFixture<BaseSponsorCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseSponsorCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseSponsorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
