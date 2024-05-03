import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomendationUserComponent } from './recomendation-user.component';

describe('RecomendationUserComponent', () => {
  let component: RecomendationUserComponent;
  let fixture: ComponentFixture<RecomendationUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecomendationUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecomendationUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
