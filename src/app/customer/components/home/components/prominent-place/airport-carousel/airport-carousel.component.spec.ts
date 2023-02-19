import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirportCarouselComponent } from './airport-carousel.component';

describe('AirportCarouselComponent', () => {
  let component: AirportCarouselComponent;
  let fixture: ComponentFixture<AirportCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirportCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AirportCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
