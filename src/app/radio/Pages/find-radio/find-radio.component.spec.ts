import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindRadioComponent } from './find-radio.component';

describe('FindRadioComponent', () => {
  let component: FindRadioComponent;
  let fixture: ComponentFixture<FindRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FindRadioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FindRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
