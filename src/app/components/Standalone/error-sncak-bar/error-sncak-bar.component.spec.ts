import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorSncakBarComponent } from './error-sncak-bar.component';

describe('ErrorSncakBarComponent', () => {
  let component: ErrorSncakBarComponent;
  let fixture: ComponentFixture<ErrorSncakBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorSncakBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ErrorSncakBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
