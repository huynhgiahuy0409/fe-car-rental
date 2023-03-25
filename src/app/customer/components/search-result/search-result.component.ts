import { NumberInput } from '@angular/cdk/coercion';
import { Location } from '@angular/common';
import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
  NavigationExtras,
  Router,
  RouteReuseStrategy,
} from '@angular/router';
import { he } from 'date-fns/locale';
import { CAR_FEATURES } from 'src/app/models/constance';
import { RouteCatchService } from '../../route-catch.service';
import { CarDetailComponent } from '../car/car-detail/car-detail.component';
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SearchResultComponent implements OnDestroy {
  startDate!: Date;
  endDate!: Date;
  address!: String;
  withDriver!: Boolean;
  urbanArea!: Boolean;
  interMunicipal!: Boolean;
  todayDate = new Date();
  hrs = [
    {
      value: 0,
      name: '0:00',
    },
    {
      value: 1800000,
      name: '0:30',
    },
  ];

  carTypeOptions = [
    {
      id: 0,
      icon: 'https://n1-cstg.mioto.vn/m/vehicle-types/mf-4-mini.png',
      seats: 4,
      type: 'Mini',
      quantity: 68,
      active: true,
    },
    {
      id: 1,
      icon: 'https://n1-cstg.mioto.vn/m/vehicle-types/mf-4-sedan.png',
      seats: 4,
      type: 'Sedan',
      quantity: 68,
      active: true,
    },
    {
      id: 2,
      icon: 'https://n1-cstg.mioto.vn/m/vehicle-types/mf-4-hatchback.png',
      seats: 4,
      type: 'Hatchback',
      quantity: 68,
      active: false,
    },
    {
      id: 3,
      icon: "https://n1-cstg.mioto.vn/m/vehicle-types/mf-5-suv.png",
      seats: 4,
      type: "Gầm cao",
      quantity: 68,
      active: false,
    },
    {
      id: 4,
      icon: "https://n1-cstg.mioto.vn/m/vehicle-types/mf-7-suv.png",
      seats: 4,
      type: "Gầm cao",
      quantity: 68,
      active: false,
    },
    {
      id: 5,
      icon: "https://n1-cstg.mioto.vn/m/vehicle-types/mf-7-mpv.png",
      seats: 4,
      type: "Gầm thấp",
      quantity: 68,
      active: false,
    },
    {
      id: 6,
      icon: "https://n1-cstg.mioto.vn/m/vehicle-types/mf-pickup.png",
      seats: 4,
      type: "Bán tải",
      quantity: 68,
      active: false,
    },
  ];

  isShowAdvancedOptions = true;
  featureList = CAR_FEATURES;
  addedFeature = ['map', 'bluetooth'];
  ableToShowRoadTabModel = false;
  showRoadTabModel = false;
  currentTab!: NumberInput;
  currentUrl!: string
  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private routeCatchService: RouteCatchService,
    private matDialog: MatDialog,
    private location: Location
  ) {}

  searchBarFormGroup = this.formBuilder.group({
    address: [''],
    addressUrban: [''],
    startDate: [new Date()],
    endDate: [new Date()],
    startHours: [0],
    endHours: [0],
    pickUpPlace: [''],
    destinationPlace: [''],
    isOneWay: [false],
  });

  ngOnInit(): void {
    console.log('SEARCH RESULT INITTTTTTTT');
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
    this.activatedRoute.queryParams.subscribe((params) => {
      this.startDate = new Date(Number(params['startDate']));
      this.endDate = new Date(Number(params['endDate']));
      this.address = params['address'];
      this.withDriver = params['withDriver'] === 'true';
      this.urbanArea = params['urbanArea'] === 'true';
      this.interMunicipal = params['interMunicipal'] === 'true';
      this.searchBarFormGroup
        .get('pickUpPlace')
        ?.setValue(params['pickUpPlace']);
      this.searchBarFormGroup
        .get('destinationPlace')
        ?.setValue(params['destinationPlace']);
      this.searchBarFormGroup
        .get('isOneWay')
        ?.setValue(params['isOneWay'] === 'true');
      this.currentTab = params['interMunicipal'] === 'true' ? 1 : 0;
      this.ableToShowRoadTabModel =
        params['urbanArea'] === 'true' || params['interMunicipal'] === 'true';
      this.setSearchBarValue();
      this.setHrsData();
    });

    this.searchOptionsFormGroup
      .get('limitDistance')
      ?.valueChanges.subscribe((value) => {
        if (Number(value) === 0) {
          this.searchOptionsFormGroup.get('limitDistanceFee')?.setValue('0');
        } else {
          this.searchOptionsFormGroup
            .get('limitDistanceFee')
            ?.setValue('10000');
        }
      });

    console.log(this.router.url
      );
    const fragment = this.activatedRoute.snapshot.fragment!;
    const queryParams = this.activatedRoute.snapshot.queryParams;
    this.currentUrl = this.router.createUrlTree([this.router.url], {queryParams, fragment}).toString();
  }

  ngOnDestroy(): void {
    console.log('SEARCH RESULT DESSSSSSSSS');
    document.body.style.overflow = 'auto';
  }

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
    fuel: ['0'],
    fuelConsumption: ['0'],
    limitDistance: ['551'],
    limitDistanceFee: ['10000'],
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
    let finalAddress = this.interMunicipal
      ? this.searchBarFormGroup.value.pickUpPlace +
        ' - ' +
        this.searchBarFormGroup.value.destinationPlace
      : this.address;
    if (!this.interMunicipal) {
      this.searchBarFormGroup
        .get('addressUrban')
        ?.setValue(String(this.address));
    }
    if (this.ableToShowRoadTabModel) {
      this.searchBarFormGroup.get('address')?.disable();
    }
    this.searchBarFormGroup.get('address')?.setValue(String(finalAddress));
    this.searchBarFormGroup
      .get('startDate')
      ?.setValue(new Date(this.startDate));
    this.searchBarFormGroup.get('endDate')?.setValue(new Date(this.endDate));
    this.searchBarFormGroup
      .get('startHours')
      ?.setValue(
        Number(
          this._convertHrsAndMinutesToMiliseconds(
            this.startDate.getHours(),
            this.startDate.getMinutes()
          )
        )
      );
    this.searchBarFormGroup
      .get('endHours')
      ?.setValue(
        Number(
          this._convertHrsAndMinutesToMiliseconds(
            this.endDate.getHours(),
            this.endDate.getMinutes()
          )
        )
      );
  }

  handleClickOption(id: number) {
    const isActive = this.carTypeOptions[id].active;
    this.carTypeOptions[id].active = !isActive;
  }

  toggleShowAdvancedOptions() {
    this.isShowAdvancedOptions = !this.isShowAdvancedOptions;
  }

  toggleShowRoadTabModel() {
    this.showRoadTabModel = !this.showRoadTabModel;
  }

  getSeatRangeTitle() {
    const min = Number(this.searchOptionsFormGroup.value.minSeats);
    const max = Number(this.searchOptionsFormGroup.value.maxSeats);
    if (min > 2 && max < 10) {
      return `Từ ${min} - ${max} chỗ`;
    } else if (min === 2 && max < 10) {
      return `Dưới ${max}`;
    } else if (min === 2 && max > 9) {
      return 'Bất kỳ';
    } else if (min > 2 && max > 9) {
      return `Trên ${min}`;
    }
    return '';
  }

  getYearRangeTitle() {
    const min = Number(this.searchOptionsFormGroup.value.minYears);
    const max = Number(this.searchOptionsFormGroup.value.maxYears);
    if (min > 2005 && max < this.todayDate.getFullYear()) {
      return `Từ ${min} đến ${max}`;
    } else if (min === 2005 && max < this.todayDate.getFullYear()) {
      return `Trước ${max}`;
    } else if (min === 2005 && max > this.todayDate.getFullYear() - 1) {
      return 'Bất kỳ';
    } else if (min > 2005 && max > this.todayDate.getFullYear() - 1) {
      return `Sau ${min}`;
    }
    return '';
  }

  getFuelConsumptionTitle() {
    const fuelConsumption = Number(
      this.searchOptionsFormGroup.value.fuelConsumption
    );
    if (fuelConsumption === 0) {
      return 'Bất kỳ';
    } else {
      return `Từ dưới ${fuelConsumption}L/100km`;
    }
  }

  getLimitDistanceTitle() {
    const limitDistance = Number(
      this.searchOptionsFormGroup.value.limitDistance
    );
    if (limitDistance === 0) {
      return "Không giới hạn";
    } else if (limitDistance < 551) {
      return `Trên ${limitDistance}km/ngày`;
    } else {
      return 'Bất kỳ';
    }
  }

  getLimitDistanceFeeTitle() {
    const limitDistanceFee = Number(
      this.searchOptionsFormGroup.value.limitDistanceFee
    );
    if (limitDistanceFee === 0) {
      return 'Miễn phí';
    } else if (limitDistanceFee < 5001) {
      return `Từ dưới ${limitDistanceFee}đ/km`;
    } else {
      return 'Bất kỳ';
    }
  }

  isActiveFeature(feature: string) {
    return this.addedFeature.includes(feature);
  }

  toggleFeature(feature: string) {
    if (this.isActiveFeature(feature)) {
      this.addedFeature = this.addedFeature.filter((item) => item !== feature);
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
      fuel: '0',
      fuelConsumption: '0',
      limitDistance: '551',
      limitDistanceFee: '10000',
    });
    this.addedFeature = [];
    this.carTypeOptions.forEach((item) => (item.active = false));
  }
  
  openCarDetailDialog(rentalMode: string){
    this.matDialog.open(CarDetailComponent, {
      data: {
        rentalMode: rentalMode,
      },
      panelClass: 'mat-dialog-bg',
      backdropClass: 'my-back-drop',
      height: '100vh'
    })
  }
}
