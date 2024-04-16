import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrisStationFilterComponent } from './countris-station-filter.component';

describe('CountrisStationFilterComponent', () => {
  let component: CountrisStationFilterComponent;
  let fixture: ComponentFixture<CountrisStationFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CountrisStationFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CountrisStationFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
