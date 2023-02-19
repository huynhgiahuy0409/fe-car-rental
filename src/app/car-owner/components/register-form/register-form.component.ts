import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CAR_FEATURES } from 'src/app/models/constance';
import { CarFeatureElement } from 'src/app/models/model';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})

export class RegisterFormComponent {

  carSeatRange!: Number[];
  carProduceYearRange!: Number[];
  carFeatures!: String[];
  carFeaturesTemplate!: CarFeatureElement[];

  constructor(private _formBuilder: FormBuilder) {
    this.carSeatRange = [];
    this.carProduceYearRange = [];
    this.carFeatures = [];
    this.carFeaturesTemplate = [];
  }

  ngOnInit(): void {
    this.initDynamicData();
  }

  initDynamicData() {
    for (let i = 4; i < 21; i++) this.carSeatRange.push(i);
    for (let i = new Date().getFullYear(); i >= 1960; i--) this.carProduceYearRange.push(i);
    this.carFeaturesTemplate = CAR_FEATURES;
  }

  handleClickFeature(elm: String) {

    const foundFeature = this.carFeatures.find((feature) => feature === elm);

    if (foundFeature) {
      const element = document.getElementById(elm.toString());
      element?.classList.remove('active');
      this.carFeatures = this.carFeatures.filter((feature) => feature !== foundFeature);
    } else {
      const element = document.getElementById(elm.toString());
      element?.classList.add('active');
      this.carFeatures.push(elm);
    }
    console.log(this.carFeatures);
  }

  carInformationFormGroup = this._formBuilder.group({
    carNumberPlate: ['', [Validators.required, Validators.pattern(/^[0-9]{2}[A-z]{1,2}-[0-9]{3}\.[0-9]{2}$/)]],
    carBrand: ['', Validators.required],
    carModel: ['', Validators.required],
    carSeats: ['', Validators.required],
    carProdYear: ['', Validators.required],
    carTransmission: ['', Validators.required],
    carFuel: ['', Validators.required],
    carFuelConsumption: ['', [Validators.required, Validators.min(0), Validators.max(50)]],
    carDescription: ['', Validators.required],
  });

  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

}
