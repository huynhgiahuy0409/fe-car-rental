import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MessageDialogService } from 'src/app/customer/services/message-dialog.service';
import { ProgressSpinnerService } from 'src/app/customer/services/progress-spinner.service';
import { EditPromoDialogComponent } from '../../promo-list/eidt-promo-dialog/eidt-promo-dialog.component';
import { BrandResponse, CarModelResponse, IdNameResponse, RegisteredCarDto } from 'src/app/models/response/model';

import { COLORS } from 'src/app/models/constance';
import { Color } from 'src/app/models/model';
import { RegisteredCarService } from 'src/app/admin/services/registered-car.service';
import { CarStatusVie } from 'src/app/models/enum';

@Component({
  selector: 'app-edit-registered-car-dialog',
  templateUrl: './edit-registered-car-dialog.component.html',
  styleUrls: ['./edit-registered-car-dialog.component.scss']
})
export class EditRegisteredCarDialogComponent {
  car!: RegisteredCarDto;
  carFormGroup!: FormGroup;
  colors: Color[] = COLORS;

  brands: BrandResponse[] = [];
  models: CarModelResponse[] = [];
  serviceTypes: IdNameResponse[] = [];
  // carStatuses: String[] = [];
  carStatuses = {
    key: Object.keys(CarStatusVie),
    value: Object.values(CarStatusVie)
  };

  constructor(private _fb: FormBuilder,
    private _progressSpinnerService: ProgressSpinnerService,
    private _messageDialogService: MessageDialogService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private matDialogRef: MatDialogRef<EditPromoDialogComponent>,
    private carServices: RegisteredCarService
  ) {
    this.car = data.car;
    console.log("dialog received car", this.car);

    const { id, color, plate, brand, price, model, service_type, status } = this.car

    this.carFormGroup = this._fb.group({
      id: [id, Validators.required],
      color: [color, Validators.required],
      plate: [plate, Validators.required],
      brand: [brand.id, Validators.required],
      model: [model.id, Validators.required],
      service_type: [service_type.id, Validators.required],
      price: [price, Validators.required],
      status: [status, Validators.required]
    });

    this.carServices.getBrands().subscribe(res => {
      this.brands = res;
    });

    this.carServices.getModelsByBrandId(brand.id).subscribe(res => {
      this.models = res;
    });

    this.carServices.getServiceTypes().subscribe(res => {
      this.serviceTypes = res;
    });

    this.carFormGroup.get("brand")?.valueChanges.subscribe(brandId => {
      this.carFormGroup.get("model")?.setValue(null);
      this.carServices.getModelsByBrandId(brandId).subscribe(res => {
        this.models = res;
      });
    });
    this.carFormGroup.get("plate")?.disable();
  }



  onSubmitForm() {
    console.log("submitted form values");
    console.log(this.carFormGroup.value);

  }
}
