import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDetailCoverCarouselComponent } from './car-detail-cover-carousel.component';

describe('CarDetailCoverCarouselComponent', () => {
  let component: CarDetailCoverCarouselComponent;
  let fixture: ComponentFixture<CarDetailCoverCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarDetailCoverCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarDetailCoverCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
