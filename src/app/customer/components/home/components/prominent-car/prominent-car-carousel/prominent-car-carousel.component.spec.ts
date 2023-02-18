import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProminentCarCarouselComponent } from './prominent-car-carousel.component';

describe('ProminentCarCarouselComponent', () => {
  let component: ProminentCarCarouselComponent;
  let fixture: ComponentFixture<ProminentCarCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProminentCarCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProminentCarCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
