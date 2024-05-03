import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomendationItemComponent } from './recomendation-item.component';

describe('RecomendationItemComponent', () => {
  let component: RecomendationItemComponent;
  let fixture: ComponentFixture<RecomendationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecomendationItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecomendationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
