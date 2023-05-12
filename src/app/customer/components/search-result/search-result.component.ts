import { NumberInput } from '@angular/cdk/coercion';
import { Location } from '@angular/common';
import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { CarOwnerService } from 'src/app/car-owner/services/car-owner.service';
import { CAR_IMG, FEATURE_ICON, TRANSMISSIONS } from 'src/app/models/constance';
import { BrandResponse, FeatureResponse, SearchCarResponse } from 'src/app/models/response/model';
import { getMoneyFormat } from 'src/app/shared/utils/MoneyUtils';
import { RouteCatchService } from '../../route-catch.service';
import { SearchCarService } from '../../services/search-car.service';
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
      id: 1,
      icon: '../../../../assets/images/mf-4-sedan.png',
      type: 'SEDAN',
      name: 'Sedan',
      quantity: 0
    },
    {
      id: 2,
      icon: '../../../../assets/images/mf-4-hatchback.png',
      type: 'HATCHBACK',
      name: 'Hatchback',
      quantity: 0
    },
    {
      id: 3,
      icon: '../../../../assets/images/register-car.png',
      type: 'SUV',
      name: 'SUV',
      quantity: 0
    },
  ];

  isShowAdvancedOptions = true;
  ableToShowRoadTabModel = false;
  showRoadTabModel = false;
  currentTab!: NumberInput;
  currentUrl!: string
  brands: BrandResponse[] = [];
  features: FeatureResponse[] = [];
  readonly BASE_FEATURE = FEATURE_ICON;
  readonly BASE_CAR = CAR_IMG;
  readonly TRANSMISSIONS = TRANSMISSIONS;

  pageNo: number = 0;
  searchResult!: SearchCarResponse[];
  isLoading = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private routeCatchService: RouteCatchService,
    private matDialog: MatDialog,
    private location: Location,
    private searchService: SearchCarService,
    private carService: CarOwnerService
  ) { }

  searchBarFormGroup = this.formBuilder.group({
    address: [''],
    addressUrban: [''],
    startDate: [new Date()],
    endDate: [new Date()],
    startHours: [0],
    endHours: [0],
    pickUpPlace: [''],
    destinationPlace: [''],
    isOneWay: [false]
  });


  searchOptionsFormGroup = this.formBuilder.group({
    sortedBy: [0],
    priceMin: [300000],
    priceMax: [3000000],
    carBrand: [0],
    transmission: ['0'],
    fastRent: [false],
    // delivery: [false],
    discount: [false],
    minSeats: 2,
    maxSeats: 10,
    minYears: 2005,
    maxYears: new Date().getFullYear(),
    fuel: ['0'],
    fuelConsumption: [0],
    limitDistance: ['551'],
    limitDistanceFee: ['10000'],
    addedFeatures: this.formBuilder.control<any>([]),
    addedTypes: this.formBuilder.control<any>([])
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
          this.searchOptionsFormGroup.get('limitDistanceFee')?.disable();
        } else {
          this.searchOptionsFormGroup.get('limitDistanceFee')?.enable();
          this.searchOptionsFormGroup
            .get('limitDistanceFee')
            ?.setValue('10000');
        }
      });

    console.log(this.router.url
    );
    const fragment = this.activatedRoute.snapshot.fragment!;
    const queryParams = this.activatedRoute.snapshot.queryParams;
    this.currentUrl = this.router.createUrlTree([this.router.url], { queryParams, fragment }).toString();

    this.initDynamicData();
    this.getSearchResult();
  }

  initDynamicData() {
    this.carService.getBrands().subscribe(res => {
      this.brands = res;
    });
    this.carService.getAllFeature().subscribe(res => {
      this.features = res;
    });
  }

  ngOnDestroy(): void {
    console.log('SEARCH RESULT DESSSSSSSSS');
    document.body.style.overflow = 'auto';
  }

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

  handleClickOption(type: any) {
    const addedTypes = this.searchOptionsFormGroup.get("addedTypes")?.value;
    if (this.isActiveType(type)) {
      const filtered = addedTypes?.filter((item: any) => item !== type);
      this.searchOptionsFormGroup?.get("addedTypes")?.setValue(filtered!);
    } else {
      const added = [...addedTypes!, type];
      this.searchOptionsFormGroup?.get("addedTypes")?.setValue(added!);
    }
  }

  isActiveType(type: any) {
    return this.searchOptionsFormGroup?.get("addedTypes")?.value?.includes(type);
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

  isActiveFeature(feature: any) {
    return this.searchOptionsFormGroup?.get("addedFeatures")?.value?.includes(feature);
  }

  toggleFeature(feature: any) {
    const addedFeatures = this.searchOptionsFormGroup.get("addedFeatures")?.value;
    if (this.isActiveFeature(feature)) {
      const filtered = addedFeatures?.filter((item: any) => item !== feature);
      this.searchOptionsFormGroup?.get("addedFeatures")?.setValue(filtered!);
    } else {
      const added = [...addedFeatures!, feature];
      this.searchOptionsFormGroup?.get("addedFeatures")?.setValue(added!);
    }
  }

  resetDefaultOption() {
    this.searchOptionsFormGroup.setValue({
      sortedBy: 0,
      priceMin: 300000,
      priceMax: 3000000,
      carBrand: 0,
      transmission: '0',
      fastRent: false,
      // delivery: false,
      discount: false,
      minSeats: 2,
      maxSeats: 10,
      minYears: 2005,
      maxYears: new Date().getFullYear(),
      fuel: '0',
      fuelConsumption: 0,
      limitDistance: '551',
      limitDistanceFee: '10000',
      addedFeatures: [],
      addedTypes: []
    });
  }

  openCarDetailDialog(rentalMode: string) {
    this.matDialog.open(CarDetailComponent, {
      data: {
        rentalMode: rentalMode,
      },
      panelClass: 'mat-dialog-bg',
      backdropClass: 'my-back-drop',
      height: '100vh'
    })
  }

  isEmpty = false;
  getSearchResult() {
    this.isLoading = true;
    this.searchResult = [];
    this.isEmpty = false;

    let startDate = this.searchBarFormGroup.value.startDate;
    let endDate = this.searchBarFormGroup.value.endDate;
    let address = this.searchBarFormGroup.value.address;
    let priceMin = this.searchOptionsFormGroup.value.priceMin;
    let priceMax: any = this.searchOptionsFormGroup.value.priceMax;
    let sortBy = Number(this.searchOptionsFormGroup.value.sortedBy);

    if (priceMax === 3000000) {
      priceMax = "MAX";
    }

    let data: any = {
      pageNo: this.pageNo,
      sortBy: sortBy,
      startDate: startDate?.getTime(),
      address: address,
      endDate: endDate?.getTime(),
      price: `${priceMin}-${priceMax}`
    }

    let carTypes = this.searchOptionsFormGroup.value.addedTypes;
    if (carTypes.length > 0) {
      data.type = carTypes;
    }

    let carBrand = this.searchOptionsFormGroup.value.carBrand;
    if (carBrand !== 0) {
      data.brand = carBrand;
    }

    let carTranmission = this.searchOptionsFormGroup.value.transmission;
    if (carTranmission !== '0') {
      data.transmission = carTranmission;
    }

    let isFastRent = this.searchOptionsFormGroup.value.fastRent;
    if (isFastRent) {
      data.isFastRent = isFastRent;
    }

    let isDiscount = this.searchOptionsFormGroup.value.discount;
    if (isDiscount) {
      data.isDiscount = isDiscount;
    }

    let distanceLimit = Number(this.searchOptionsFormGroup.value.limitDistance);
    let finalDistanceLimit = "";
    if (distanceLimit > 0 && distanceLimit < 551) {
      finalDistanceLimit = distanceLimit + "/";

      let limitDistanceFee = Number(this.searchOptionsFormGroup.value.limitDistanceFee);
      if (limitDistanceFee === 0) {
        finalDistanceLimit += "FREE";
      } else if (limitDistanceFee < 5001) {
        finalDistanceLimit += "<" + limitDistanceFee;
      } else {
        finalDistanceLimit += "MAX";
      }
      data.distanceLimit = finalDistanceLimit;
    } else {
      data.distanceLimit = "noDistanceLimit";
    }

    let minSeats = this.searchOptionsFormGroup.value.minSeats;
    let maxSeats = this.searchOptionsFormGroup.value.maxSeats;
    let seatRangeTitle = this.getSeatRangeTitle();
    if (seatRangeTitle !== "Bất kỳ") {
      let finalSeats = "";

      if (seatRangeTitle.includes("Dưới")) {
        finalSeats = "<" + maxSeats;
      } else if (seatRangeTitle.includes("Trên")) {
        finalSeats = ">" + minSeats;
      } else {
        finalSeats = minSeats + "-" + maxSeats;
      }
      data.seats = finalSeats;
    }

    let minYears = this.searchOptionsFormGroup.value.minYears;
    let maxYears = this.searchOptionsFormGroup.value.maxYears;
    let yearRangeTitle = this.getYearRangeTitle();
    if (yearRangeTitle !== "Bất kỳ") {
      let finalYears = "";

      if (yearRangeTitle.includes("Trước")) {
        finalYears = "<" + maxYears;
      } else if (yearRangeTitle.includes("Sau")) {
        finalYears = ">" + minYears;
      } else {
        finalYears = minYears + "-" + maxYears;
      }
      data.yearOfManufacture = finalYears;
    }

    let fuel = this.searchOptionsFormGroup.value.fuel;
    if (fuel !== '0') {
      data.fuel = fuel;
    }

    let fuelConsumption = Number(this.searchOptionsFormGroup.value.fuelConsumption);
    if (fuelConsumption > 0) {
      data.fuelConsumption = fuelConsumption;
    }

    let features = this.searchOptionsFormGroup.value.addedFeatures;
    if (features.length > 0) {
      data.features = features;
    }
    console.log("values", this.searchOptionsFormGroup.value);



    console.log(data);
    this.searchService.searchCar(data).subscribe({
      next: (res) => {
        console.log(res);
        this.searchResult = res;
        this.isLoading = false;
        if (res?.length > 0) {
          this.isEmpty = false;
        } else {
          this.isEmpty = true;
        }
        this.setCarTypeQuantity();
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
        this.isEmpty = true;
        this.setCarTypeQuantity();
      }
    });
  }

  getMoneyFormat(money: any) {
    return getMoneyFormat(money);
  }

  setCarTypeQuantity() {
    this.carTypeOptions[0].quantity = this.searchResult.filter(car => car.type === "SEDAN").length;
    this.carTypeOptions[1].quantity = this.searchResult.filter(car => car.type === "HATCHBACK").length;
    this.carTypeOptions[2].quantity = this.searchResult.filter(car => car.type === "SUV").length;
  }

  getTransmissionName(transmission: string) {
    return TRANSMISSIONS.find(item => item.value === transmission)?.name;
  }

  toNumber(str: any) {
    return Number(str);
  }
}
