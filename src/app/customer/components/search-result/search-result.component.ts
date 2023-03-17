import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CAR_FEATURES } from 'src/app/models/constance';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent {
  startDate!: Date;
  endDate!: Date;
  address!: String;
  withDriver!: Boolean;
  urbanArea!: Boolean;
  interMunicipal!: Boolean;
  todayDate = new Date();
  pickUpPlace!: String;
  destinationPlace!: String;
  hrs = [
    {
      value: 0,
      name: '0:00'
    },
    {
      value: 1800000,
      name: '0:30'
    },
  ]

  carTypeOptions = [
    {
      id: 0,
      icon: "https://n1-cstg.mioto.vn/m/vehicle-types/mf-4-mini.png",
      seats: 4,
      type: "Mini",
      quantity: 68,
      active: true
    },
    {
      id: 1,
      icon: "https://n1-cstg.mioto.vn/m/vehicle-types/mf-4-sedan.png",
      seats: 4,
      type: "Sedan",
      quantity: 68,
      active: true
    },
    {
      id: 2,
      icon: "https://n1-cstg.mioto.vn/m/vehicle-types/mf-4-hatchback.png",
      seats: 4,
      type: "Hatchback",
      quantity: 68,
      active: false
    },
    {
      id: 3,
      icon: "https://n1-cstg.mioto.vn/m/vehicle-types/mf-5-suv.png",
      seats: 4,
      type: "Gầm cao",
      quantity: 68,
      active: false
    },
    {
      id: 4,
      icon: "https://n1-cstg.mioto.vn/m/vehicle-types/mf-7-suv.png",
      seats: 4,
      type: "Gầm cao",
      quantity: 68,
      active: false
    },
    {
      id: 5,
      icon: "https://n1-cstg.mioto.vn/m/vehicle-types/mf-7-mpv.png",
      seats: 4,
      type: "Gầm thấp",
      quantity: 68,
      active: false
    },
    {
      id: 6,
      icon: "https://n1-cstg.mioto.vn/m/vehicle-types/mf-pickup.png",
      seats: 4,
      type: "Bán tải",
      quantity: 68,
      active: false
    },
  ]

  isShowAdvancedOptions = false;
  featureList = CAR_FEATURES;
  addedFeature = ["map", "bluetooth"];
  constructor(private router: ActivatedRoute, private formBuilder: FormBuilder) {
  }


  ngOnInit(): void {
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
    this.router.queryParams.subscribe(params => {
      this.startDate = new Date(Number(params['startDate']));
      this.endDate = new Date(Number(params['endDate']));
      this.address = params['address'];
      this.withDriver = params['withDriver'] === 'true';
      this.urbanArea = params['urbanArea'] === 'true';
      this.interMunicipal = params['interMunicipal'] === 'true';
      this.pickUpPlace = params['pickUpPlace'];
      this.destinationPlace = params['destinationPlace'];
    });
    this.setSearchBarValue();
    this.setHrsData();
  }

  ngOnDestroy(): void {
    document.body.style.overflow = 'auto';
  }
  
  searchBarFormGroup = this.formBuilder.group({
    address: [''],
    startDate: [new Date()],
    endDate: [new Date()],
    startHours: [0],
    endHours: [0],
  });

  searchOptionsFormGroup = this.formBuilder.group({
    sortedBy: ['0'],
    priceMin: [300],
    priceMax: [3000],
    isFiveStarDriver: [false],
    carBrand: ['0'],
    transmission: ['0'],
    fastRent: [false],
    delivery: [false],
    discount: [false],
    minSeats: 2,
    maxSeats: 10,
    minYears: 2005,
    maxYears: new Date().getFullYear(),
    fuel: ["0"],
    fuelConsumption: ["0"],
  });

  private setHrsData() {
    for (let i = 1; i <= 23; i++) {
      let str = `${i}:00`;
      let str1 = `${i}:30`;
      let strMili = this._convertHrsStrToMiliseconds(str);
      let str1Mili = this._convertHrsStrToMiliseconds(str1);
      this.hrs.push({ value: strMili, name: str });
      this.hrs.push({ value: str1Mili, name: str1 });
    }
  }

  private _convertHrsStrToMiliseconds(hrs: string) {
    let hrsArr = hrs.split(':');
    let hrsInMiliseconds = Number(hrsArr[0]) * 60 * 60 * 1000;
    let minsInMiliseconds = Number(hrsArr[1]) * 60 * 1000;
    return hrsInMiliseconds + minsInMiliseconds;
  }

  private _convertHrsAndMinutesToMiliseconds(hours: number, minutes: number) {
    let hrsInMiliseconds = hours * 60 * 60 * 1000;
    let minsInMiliseconds = minutes * 60 * 1000;
    return hrsInMiliseconds + minsInMiliseconds;
  }


  setSearchBarValue() {
    let finalAddress = this.interMunicipal ? this.pickUpPlace + ' - ' + this.destinationPlace : this.address;
    this.searchBarFormGroup.setValue({
      address: String(finalAddress),
      startDate: new Date(this.startDate),
      endDate: new Date(this.endDate),
      startHours: Number(this._convertHrsAndMinutesToMiliseconds(this.startDate.getHours(), this.startDate.getMinutes())),
      endHours: Number(this._convertHrsAndMinutesToMiliseconds(this.endDate.getHours(), this.endDate.getMinutes())),
    });
  }

  handleClickOption(id: number) {
    const isActive = this.carTypeOptions[id].active;
    this.carTypeOptions[id].active = !isActive;
  }

  toggleShowAdvancedOptions() {
    this.isShowAdvancedOptions = !this.isShowAdvancedOptions;
  }

  getSeatRangeTitle() {
    const min = Number(this.searchOptionsFormGroup.value.minSeats);
    const max = Number(this.searchOptionsFormGroup.value.maxSeats);
    if (min > 2 && max < 10) {
      return `Từ ${min} - ${max} chỗ`;
    } else if (min === 2 && max < 10) {
      return `Dưới ${max}`;
    } else if (min === 2 && max > 9) {
      return "Bất kỳ";
    } else if (min > 2 && max > 9) {
      return `Trên ${min}`;
    }
    return "";
  }

  getYearRangeTitle() {
    const min = Number(this.searchOptionsFormGroup.value.minYears);
    const max = Number(this.searchOptionsFormGroup.value.maxYears);
    if (min > 2005 && max < this.todayDate.getFullYear()) {
      return `Từ ${min} đến ${max}`;
    } else if (min === 2005 && max < this.todayDate.getFullYear()) {
      return `Trước ${max}`;
    } else if (min === 2005 && max > this.todayDate.getFullYear() - 1) {
      return "Bất kỳ";
    } else if (min > 2005 && max > this.todayDate.getFullYear() - 1) {
      return `Sau ${min}`;
    }
    return "";
  }

  getFuelConsumptionTitle() {
    const fuelConsumption = Number(this.searchOptionsFormGroup.value.fuelConsumption);
    if (fuelConsumption === 0) {
      return "Bất kỳ";
    } else {
      return `Từ dưới ${fuelConsumption}L/100km`;
    }
  }

  isActiveFeature(feature: string) {
    return this.addedFeature.includes(feature);
  }

  toggleFeature(feature: string) {
    if (this.isActiveFeature(feature)) {
      this.addedFeature = this.addedFeature.filter(item => item !== feature);
    } else {
      this.addedFeature.push(feature);
    }
  }

  resetDefaultOption() {
    this.searchOptionsFormGroup.setValue({
      sortedBy: '0',
      priceMin: 300,
      priceMax: 3000,
      isFiveStarDriver: false,
      carBrand: '0',
      transmission: '0',
      fastRent: false,
      delivery: false,
      discount: false,
      minSeats: 2,
      maxSeats: 10,
      minYears: 2005,
      maxYears: new Date().getFullYear(),
      fuel: "0",
      fuelConsumption: "0",
    });
    this.addedFeature = [];
    this.carTypeOptions.forEach(item => item.active = false);
  }

  asd() {
    console.log(this.startDate);
    console.log(this.endDate);
    console.log(this.address);
  }
}
