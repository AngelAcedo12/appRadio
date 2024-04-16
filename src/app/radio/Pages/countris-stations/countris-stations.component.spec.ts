import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrisStationsComponent } from './countris-stations.component';

describe('CountrisStationsComponent', () => {
  let component: CountrisStationsComponent;
  let fixture: ComponentFixture<CountrisStationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CountrisStationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CountrisStationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
