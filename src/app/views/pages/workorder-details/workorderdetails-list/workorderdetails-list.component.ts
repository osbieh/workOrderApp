import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, Inject, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/core/auth';
import { WorkOrderDetail } from 'src/app/core/_models/workOrderDetail.model';
import { WorkorderdetailsService } from 'src/app/core/_services/_service/workorder-details.service';
import { WorkorderEditComponent } from '../../work-order/workorder-edit/workorder-edit.component';
import { WorkorderdetailsEditComponent } from '../workorderdetails-edit/workorderdetails-edit.component';

@Component({
  selector: 'app-workorderdetails-list',
  templateUrl: './workorderdetails-list.component.html',
  styleUrls: ['./workorderdetails-list.component.css']
})
export class WorkorderdetailsListComponent implements OnInit, AfterViewInit {


  displayedDetailColumns: string[] = ['id', 'location', 'description', 'progress'];
  public dataSource = new MatTableDataSource;
  controls: FormArray;
  dataLength: number;
  workerId: number;
  isForemen: boolean;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChildren(MatTable) _matTables;

  constructor(private workorderdetailsService: WorkorderdetailsService,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog,
    authService: AuthService
  ) {

    this.isForemen = authService.isForemen;
  }
  ngAfterViewInit(): void {

    this.dataSource.paginator = this.paginator;

  }

  ngOnInit(): void {

    // this.createForm();
    if (this.data) {
      this.fillTableData(this.data.recordId);
    }



  }
  fillTableData(workorderId: number) {

    this.workorderdetailsService.getWorkOrdersDetialsByWorksOrderId(workorderId)
      .subscribe(result => {
        this.dataLength = result.length;
        this.dataSource.data = result;
        console.log(this.dataSource.data);
        const toGroups = this.dataSource.data.map((entity: WorkOrderDetail) => {
          return new FormGroup({
            id: new FormControl(entity.id, Validators.required),
            description: new FormControl(entity.description, Validators.required),
            location: new FormControl(entity.location, Validators.required),
            progress: new FormControl(entity.progress, Validators.required),
            workOrderId: new FormControl(entity.workOrderId, Validators.required),
          }, { updateOn: "blur" });
        });

        this.controls = new FormArray(toGroups);

        console.log(this.controls);
      },
        (err: HttpErrorResponse) => {
          console.log(err.error);
          console.log(err.message);
        });

  }


  createNewWorkOrderDetails(id: number): WorkOrderDetail {
    if (this.data) {
      return { id: 10, description: "", location: "", progress: 0, workOrderId: this.data.recordId };
    }

    return { id: 10, description: "", location: "", progress: 0, workOrderId: 1 };
  }

  addRow() {
    // this.dataSource.data.push(this.createNewWorkOrderDetails(this.dataSource.data.length + 1));
    // this.dataSource.filter = "";
    this.newWorkOrderDetails()
  }


  newWorkOrderDetails() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    let dialogRef = this.dialog.open(WorkorderdetailsEditComponent, dialogConfig);

  }

}
