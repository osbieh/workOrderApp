

import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, EventEmitter, Inject, ViewChildren } from '@angular/core';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WorkOrder, WorkOrderService } from 'src/app/core/_services';
import { WorkorderListComponent } from '../workorder-list/workorder-list.component';

// Used for importing lists from the html.
import { locations } from './../../../../core/_dataBase/locations-list';
import { formatDate } from '@angular/common';
import { AuthService } from 'src/app/core/auth';
@Component({
  selector: 'app-workorder-edit',
  templateUrl: './workorder-edit.component.html',
  styleUrls: ['./workorder-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class WorkorderEditComponent implements OnInit{

  public addEditworkOrderForm: FormGroup;
  value: number;
  creationFieldDisabled = true;
  private recordId: number;
  creationDate: Date;
  // This is a form group from FormBuilder.
  @ViewChild(WorkorderEditComponent)
  private addEditForm: WorkorderEditComponent;
  onAdd = new EventEmitter();

  isForemen: boolean;



  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<WorkorderEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private workOrderService: WorkOrderService,
    private authService: AuthService,

  ) {
    this.isForemen = authService.isForemen;
  }



  ngOnInit() {
    this.createForm();
    if (this.data) {
      this.fetchRecord();
    }
    if (this.isForemen)
      this.disableFormenInputs();

  }


  private createForm() {
    this.addEditworkOrderForm = this.fb.group({
      id: [''],
      creation: [ formatDate(new Date(), 'dd/MM/yyyy', 'en-US'), Validators.required],
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
          this.creationDate = data.creation;
        }

      );

  }


  private fillForm(parsedData: WorkOrder) {

    this.addEditworkOrderForm.setValue({
      id: parsedData.id,
      creation: formatDate(parsedData.creation, 'dd/MM/yyyy', 'en-US'),
      operation: parsedData.operation,
      start: parsedData.start,
      end: parsedData.end,
      progress: parsedData.progress
    });

  }

  onSubmit(addWorkOrder) {


    if (this.addEditworkOrderForm.valid) {
      if (this.isForemen)
      this.enableFormenInputs();

      addWorkOrder.addEditworkOrderForm.patchValue({
          start:formatDate(new Date(this.addEditworkOrderForm.value.start), 'yyyy-MM-dd', 'en-US'),
          end:  formatDate(new Date(this.addEditworkOrderForm.value.end), 'yyyy-MM-dd', 'en-US'),
        });

      if (this.recordId) {
       

        this.workOrderService
          .updateWorkOrder(addWorkOrder.addEditworkOrderForm.value)
          .subscribe(
            res => {
              console.log("Work Order Updated");
              this.onAdd.emit();
              this.dialogRef.close();
            },
            (err: HttpErrorResponse) => {
              console.log(err.error);
              console.log(err.message);
            }
          );


      } else {
        addWorkOrder.addEditworkOrderForm.patchValue(
          {
            creation: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
            id: Math.floor(Math.random() * 1000) + 7
          });
        this.workOrderService
          .createWorkOrder(addWorkOrder.addEditworkOrderForm.value)
          .subscribe(
            res => {
              console.log("new WorkOrder Create");
              this.onAdd.emit();
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


  disableFormenInputs() {
    this.addEditworkOrderForm.controls['start'].disable();
    this.addEditworkOrderForm.controls['end'].disable();
    this.addEditworkOrderForm.controls['operation'].disable();
    this.addEditworkOrderForm.controls['creation'].disable();
  }

  enableFormenInputs() {
    this.addEditworkOrderForm.controls['start'].enable();
    this.addEditworkOrderForm.controls['end'].enable();
    this.addEditworkOrderForm.controls['operation'].enable();
    this.addEditworkOrderForm.controls['creation'].enable();

  }








}
