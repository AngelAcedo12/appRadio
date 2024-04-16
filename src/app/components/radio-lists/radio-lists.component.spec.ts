import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioListsComponent } from './radio-lists.component';

describe('RadioListsComponent', () => {
  let component: RadioListsComponent;
  let fixture: ComponentFixture<RadioListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RadioListsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RadioListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
