import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarSelfDrivingComponent } from './car-Self-driving.component';

describe('CarSelfDrivingComponent', () => {
  let component: CarSelfDrivingComponent;
  let fixture: ComponentFixture<CarSelfDrivingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarSelfDrivingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarSelfDrivingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
