import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormArray, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth';
import { ConfirmService, WorkOrderService } from 'src/app/core/_services';
import { WorkorderEditComponent } from '../workorder-edit/workorder-edit.component';


@Component({
  selector: 'app-workorder-list',
  templateUrl: './workorder-list.component.html',
  styleUrls: ['./workorder-list.component.css']
})
export class WorkorderListComponent implements OnInit, AfterViewInit {
  public dataSource = new MatTableDataSource;
  public dataLength: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  currentUserRole: string;
  isForemen: boolean;
  private dsData: any;
  private idColumn = 'id';

  private wec: WorkorderEditComponent;

  public displayedColumns = [
    'id',
    'creation',
    'operation',
    'start',
    'end',
    'progress',
    'options'
  ];
  constructor(private workOrderService: WorkOrderService, public dialog: MatDialog,
         private authService: AuthService,private confirmService:ConfirmService) {
    this.isForemen = authService.isForemen;

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
    dialogConfig.width = '850px';

    let dialogRef = this.dialog.open(WorkorderEditComponent, dialogConfig);
    
    const sub = dialogRef.componentInstance.onAdd.subscribe(() => {
      this.refreshTable();
    });
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
  public editRecord(workOrderId) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '850px';
    dialogConfig.data = { recordId: workOrderId, refreshTable: this.refreshTable() }
    let dialogRef = this.dialog.open(WorkorderEditComponent, dialogConfig);

    const sub = dialogRef.componentInstance.onAdd.subscribe(() => {
      this.refreshTable();
    });
    // this.dialog.open(this., {
    //   data: {recordId: recordId, idColumn: this.idColumn, paginator: this.paginator, dataSource: this.dataSource}
    // });
  }

  // --------------- DELETE ------------------

  public deleteRecord(recordId) {

    this.confirmService.confirm('Work Order ID: '+recordId, 'will be deleted')
    .pipe(
      switchMap(res => {
          if (res === true) {
        return this.workOrderService.deleteWorkOrder(recordId);
      }
    }
    )).subscribe(
      result => {
        this.deleteRowDataTable(recordId, this.idColumn, this.paginator, this.dataSource);
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.message);
      }
    );

  }

  // Remove the deleted row from the data table. Need to remove from the downloaded data first.
  private deleteRowDataTable(recordId, idColumn, paginator, dataSource) {
    this.dsData = dataSource.data;
    const itemIndex = this.dsData.findIndex(obj => obj[idColumn] === recordId);
    dataSource.data.splice(itemIndex, 1);
    dataSource.paginator = paginator;

  }

}