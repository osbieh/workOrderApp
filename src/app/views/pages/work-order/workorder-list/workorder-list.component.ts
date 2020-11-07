import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormArray, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { WorkOrderService } from 'src/app/core/work-order';






@Component({
  selector: 'app-workorder-list',
  templateUrl: './workorder-list.component.html',
  styleUrls: ['./workorder-list.component.css']
})
export class WorkorderListComponent  implements OnInit,AfterViewInit {
  public dataSource = new MatTableDataSource;
  public dataLength: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public displayedColumns = [
    'id',
    'creation',
    'operation',
    'start',
    'end',
    'progress',
    'options'
];
  constructor(private workOrderService:WorkOrderService){



  
  }
  ngOnInit(): void {

    this.workOrderService.getAllWorkOrders()
      .subscribe(data => {
      this.dataLength = data.length;
      this.dataSource.data = data;
    },
    (err: HttpErrorResponse) => {
    console.log(err.error);
    console.log(err.message);
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public selectMember(selectedMember) {
    // push the id's into an array then call it with the button.
    return null;
  }

  public addRecord() {
   
  }


  // ----------- EDIT & UPDATE --------------

  public editRecord(recordId) {
   
  }



// --------------- DELETE ------------------

  public deleteRecord(recordId) {
  }

}