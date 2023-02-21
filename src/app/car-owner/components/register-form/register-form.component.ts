import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { CAR_FEATURES, CITIES } from 'src/app/models/constance';
import { AddressField, CarFeatureElement, DistrictAddressResponse, Location, LocationResponse, WardsAddressResponse, City } from 'src/app/models/model';
import { getMoneyFormat } from 'src/app/shared/utils/MoneyUtils';
import { CarOwnerService } from '../../services/car-owner.service';

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
  recommendPrice = 500000;
  recommendPriceInFormat = getMoneyFormat(this.recommendPrice);
  showAddressModal = false;
  fetchedDistricts: AddressField[];
  fetchedWards!: AddressField[];
  fetchedLocation!: Location[];
  cities: City[] = CITIES;

  constructor(private _formBuilder: FormBuilder, private carServices: CarOwnerService) {
    this.carSeatRange = [];
    this.carProduceYearRange = [];
    this.carFeatures = [];
    this.carFeaturesTemplate = [];
    this.fetchedDistricts = [];
    this.fetchedWards = [];
    this.fetchedLocation = [];
  }

  carInformationFormGroup = this._formBuilder.group({
    //remove all the values at the first index in array down below to clear form value
    carNumberPlate: ['51A-123.56', [Validators.required, Validators.pattern(/^[0-9]{2}[A-z]{1,2}-[0-9]{3}\.[0-9]{2}$/)]],
    carBrand: ['0', Validators.required],
    carModel: ['0', Validators.required],
    carSeats: ['4', Validators.required],
    carProdYear: ['2000', Validators.required],
    carTransmission: ['0', Validators.required],
    carFuel: ['0', Validators.required],
    carFuelConsumption: ['20', [Validators.required, Validators.min(0), Validators.max(50)]],
    carDescription: ['test', Validators.required],
  });

  toggleDiscountGroup = new FormGroup({
    isDiscount: new FormControl(true),
    discountPercentByWeek: new FormControl(1),
    discountPercentByMonth: new FormControl(1)
  });

  toggleFastRentGroup = new FormGroup({
    isFastRent: new FormControl(false),
    limitFrom: new FormControl("6"),
    untilWeek: new FormControl("2"),
  });

  forRentFormGroup = this._formBuilder.group({
    //remove this.recommendPrice to clear form value
    defaultPrice: [this.recommendPrice, [Validators.required, Validators.min(100000), Validators.max(5000000)]],
    defaultLocation: ['Địa chỉ mặc định để giao nhận xe.', Validators.required],
  });

  addressFormGroup = this._formBuilder.group({
    street: ['', Validators.required],
    district: ['', Validators.required],
    ward: ['', Validators.required],
    city: ['', Validators.required]
  });

  ngOnInit(): void {
    this.initDynamicData();
    this.onChangeStreet();
  }

  onChangeCity() {
    const areaCode = Number(this.addressFormGroup.get('city')?.value);
    this.carServices.getDistrictByAreaCode(areaCode).subscribe((res: DistrictAddressResponse) => {
      this.fetchedDistricts = res.data.districts;
    });
  }

  onChangeDistrict() {
    const districtCode = Number(this.addressFormGroup.get('district')?.value);
    this.carServices.getWardsByDistrict(districtCode).subscribe((res: WardsAddressResponse) => {
      this.fetchedWards = res.data.wards;
    })
  }

  onChangeStreet() {
    this.addressFormGroup.get('street')?.valueChanges.pipe(distinctUntilChanged(), debounceTime(250)).subscribe(location => {
      this.carServices.searchAddress(String(location)).subscribe((res: LocationResponse) => {
        this.fetchedLocation = res.data.locations;
      });
    });
  }

  onSubmitAddress() {
    const cityCode = Number(this.addressFormGroup.get('city')?.value);
    const districtCode = Number(this.addressFormGroup.get('district')?.value);
    const wardCode = Number(this.addressFormGroup.get('ward')?.value);
    const street = this.addressFormGroup.get('street')?.value;

    const cityName = this.findCityNameByCode(cityCode);
    const districtName = this.findDistrictNameByCode(districtCode);
    const wardName = this.findWardNameByCode(wardCode);

    const finalLocation = `${street}, ${wardName}, ${districtName}, ${cityName}`;
    this.forRentFormGroup.get('defaultLocation')?.setValue(finalLocation);
    this.toggleAddressModal();
  }

  findCityNameByCode(areaCode: number) {
    const foundCity = this.cities.find((city) => city.areaCode === areaCode);
    return foundCity?.name;
  }

  findDistrictNameByCode(districtCode: number) {
    const foundDistrict = this.fetchedDistricts.find((district) => district.id === districtCode);
    return foundDistrict?.name;
  }

  findWardNameByCode(wardCode: number) {
    const foundWard = this.fetchedWards.find((ward) => ward.id === wardCode);
    return foundWard?.name;
  }

  initDynamicData() {
    for (let i = 4; i < 21; i++) this.carSeatRange.push(i);
    for (let i = new Date().getFullYear(); i >= 1960; i--) this.carProduceYearRange.push(i);
    this.carFeaturesTemplate = CAR_FEATURES;
  }

  toggleAddressModal() {
    this.showAddressModal = !this.showAddressModal;
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
}
