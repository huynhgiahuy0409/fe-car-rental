import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CAR_DUMMY } from 'src/app/models/constance';
import { CarAdminResponse, RegisteredCarDto } from 'src/app/models/response/model';
import { EditRegisteredCarDialogComponent } from './edit-registered-car-dialog/edit-registered-car-dialog.component';

@Component({
  selector: 'app-registered-car-listing',
  templateUrl: './registered-car-listing.component.html',
  styleUrls: ['./registered-car-listing.component.scss']
})

export class RegisteredCarListingComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'created_date', 'color', 'plate', 'price', 'brand_name', 'model_name', 'service_type', 'status', 'actions'];
  dataSource: MatTableDataSource<CarAdminResponse>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  carDummy: CarAdminResponse[] = CAR_DUMMY;
  constructor(private _matDialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.carDummy);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editCar(car: RegisteredCarDto) {
    let editDialogRef = this._matDialog.open(EditRegisteredCarDialogComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        car
      },
    });
    editDialogRef.afterClosed().subscribe((response) => {
      console.log(response)
      // if (response.updatedPromo) {
      //   let currDataSource = this.dataSource.data;
      //   let updatedPromo: RegisteredCarDto = response.updatedPromo;
      //   let index = currDataSource.findIndex((row) => row.id === updatedPromo.id);
      //   currDataSource[index] = updatedPromo;
      //   this.dataSource.data = currDataSource;
      // }
    });
  }
}
