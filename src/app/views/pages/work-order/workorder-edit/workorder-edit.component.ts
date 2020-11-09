

import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Inject, ViewChildren } from '@angular/core';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WorkOrderService } from 'src/app/core/work-order';
import { WorkorderListComponent } from '../workorder-list/workorder-list.component';

// Used for importing lists from the html.
import { locations } from './../../../../core/_dataBase/locations-list';

@Component({
  selector: 'app-workorder-edit',
  templateUrl: './workorder-edit.component.html',
  styleUrls: ['./workorder-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class WorkorderEditComponent implements OnInit, AfterViewInit {

  public addEditworkOrderForm: FormGroup;
  value: number;
  creationFieldDisabled = true;
  private recordId: number;

  // This is a form group from FormBuilder.
  @ViewChild(WorkorderEditComponent)
  private addEditForm: WorkorderEditComponent;


  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<WorkorderEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private workOrderService: WorkOrderService) {

  }
  ngAfterViewInit(): void {


  }


  ngOnInit() {
    this.createForm();
    if(this.data){
     this.fetchRecord();
    }

   
  }


  private createForm() {
    this.addEditworkOrderForm = this.fb.group({
      id: [''],
      creation: new FormControl({ value: new Date(), disabled: this.creationFieldDisabled }),
      operation: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
      progress: ['', Validators.required],
    });
  }

  public fetchRecord() {
    this.recordId = this.data.recordId;
    this.workOrderService
      .getWorkOrderById(this.recordId)
      .subscribe(
        data => {
          this.fillForm(data);
        }

      );

  }


  private fillForm(parsedData) {

    this.addEditworkOrderForm.setValue({
      id: parsedData.id,
      creation: parsedData.creation,
      operation: parsedData.operation,
      start: parsedData.start,
      end: parsedData.end,
      progress: parsedData.progress
    });

  }

  onSubmit(addWorkOrder) {

    if (this.addEditworkOrderForm.valid) {

      if (this.recordId) {
        this.workOrderService
        .updateWorkOrder(addWorkOrder.addEditworkOrderForm.value)
        .subscribe(
          res => {
            console.log("Work Order Updated");
            this.dialogRef.close();
          },
          (err: HttpErrorResponse) => {
            console.log(err.error);
            console.log(err.message);
          }
        );


      } else {

        this.workOrderService
          .createWorkOrder(addWorkOrder.addEditworkOrderForm.value)
          .subscribe(
            res => {
              console.log("new WorkOrder Create");
              this.dialogRef.close();
            },
            (err: HttpErrorResponse) => {
              console.log(err.error);
              console.log(err.message);
            }
          );

      }


    }

  }













}
