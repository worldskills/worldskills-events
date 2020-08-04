import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorCreateComponent } from './sponsor-create.component';

describe('SponsorCreateComponent', () => {
  let component: SponsorCreateComponent;
  let fixture: ComponentFixture<SponsorCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
