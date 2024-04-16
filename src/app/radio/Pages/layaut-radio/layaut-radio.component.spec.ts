import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayautRadioComponent } from './layaut-radio.component';

describe('LayautRadioComponent', () => {
  let component: LayautRadioComponent;
  let fixture: ComponentFixture<LayautRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayautRadioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LayautRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
