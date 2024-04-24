import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotSelectedComponent } from './not-selected.component';

describe('NotSelectedComponent', () => {
  let component: NotSelectedComponent;
  let fixture: ComponentFixture<NotSelectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotSelectedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
