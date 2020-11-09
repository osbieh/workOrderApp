import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormArray, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { WorkOrderService } from 'src/app/core/work-order';
import { WorkorderEditComponent } from '../workorder-edit/workorder-edit.component';






@Component({
  selector: 'app-workorder-list',
  templateUrl: './workorder-list.component.html',
  styleUrls: ['./workorder-list.component.css']
})
export class WorkorderListComponent  implements OnInit,AfterViewInit {
  public dataSource = new MatTableDataSource;
  public dataLength: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  private wec:WorkorderEditComponent;

  public displayedColumns = [
    'id',
    'creation',
    'operation',
    'start',
    'end',
    'progress',
    'options'
];
  constructor(private workOrderService:WorkOrderService,public dialog: MatDialog,){

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
  public addRecord() {
    const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width='850px';
        
        this.dialog.open(WorkorderEditComponent, dialogConfig);
  }
 
  public refreshTable() {
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




  // ----------- EDIT & UPDATE --------------
  public editRecord(recordId) {

    const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width='850px';
        dialogConfig.data={recordId: recordId}
        this.dialog.open(WorkorderEditComponent, dialogConfig);

    // this.dialog.open(this., {
    //   data: {recordId: recordId, idColumn: this.idColumn, paginator: this.paginator, dataSource: this.dataSource}
    // });
  }




// --------------- DELETE ------------------

  public deleteRecord(recordId) {
  }

}