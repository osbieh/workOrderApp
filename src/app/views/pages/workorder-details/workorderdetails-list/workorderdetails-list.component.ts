import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { WorkorderdetailsService } from 'src/app/core/work-order/_services/workorder-details.service';

@Component({
  selector: 'app-workorderdetails-list',
  templateUrl: './workorderdetails-list.component.html',
  styleUrls: ['./workorderdetails-list.component.css']
})
export class WorkorderdetailsListComponent implements OnInit,AfterViewInit {
    
  displayedDetailColumns: string[] = ['id', 'description', 'location', 'progress'];
  public dataSource = new MatTableDataSource;
  controls: FormArray;
  dataLength:number;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private workorderdetailsService:WorkorderdetailsService) { }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {

    this.workorderdetailsService.getAllWorkorderdetails()
    .subscribe(data => {

      console.log(data );
    this.dataLength = data.length;
    this.dataSource.data = data;
  },
  (err: HttpErrorResponse) => {
  console.log(err.error);
  console.log(err.message);
  });

  }

  updateField(index, field) {
    const control = this.getControl(index, field);
    // if (control.valid) {
    // //  this.core.update(index,field,control.value);
    // }

   }

  getControl(index, fieldName) {
    const a  = this.controls.at(index).get(fieldName) as FormControl;
    return this.controls.at(index).get(fieldName) as FormControl;
  }


}
