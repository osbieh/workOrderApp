import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WorkorderdetailsService } from 'src/app/core/_services';
import { locations } from './../../../../core/_dataBase/locations-list'
@Component({
  selector: 'app-workorderdetails-edit',
  templateUrl: './workorderdetails-edit.component.html',
  styleUrls: ['./workorderdetails-edit.component.css']
})
export class WorkorderdetailsEditComponent implements OnInit {
  public addEditworkOrderDetailsForm: FormGroup;
  onAdd = new EventEmitter();
  workerOrderId:number;

  locations = [
    { value: 'Jerusalem', viewValue: 'Jerusalem' },
    { value: 'Bethlehem', viewValue: 'Bethlehem' },
    { value: 'Ramallah', viewValue: 'Ramallah' },
    { value: 'Hebron', viewValue: 'Hebron' }
  ];
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<WorkorderdetailsEditComponent>,
    private workorderdetailsService:WorkorderdetailsService,  @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

  ngOnInit(): void {
    this.createForm();

     console.log("data edit form ",this.data);
     this.workerOrderId=this.data.workerOrderId;
  }

  private createForm() {
    this.addEditworkOrderDetailsForm = this.fb.group({
      id: [''],
      location: ['', Validators.required],
      description: ['', Validators.required],
      progress: ['', Validators.required],
    });


  }
  

  onSubmit(addWorkOrder) {

    if (addWorkOrder.addEditworkOrderDetailsForm.valid) {

      addWorkOrder.addEditworkOrderDetailsForm.patchValue(
        {
          id: Math.floor(Math.random() * 1000) + 7,
       
        });

        addWorkOrder.addEditworkOrderDetailsForm.value.workOrderId=this.workerOrderId;
        this.workorderdetailsService.createWorkOrderDetails(addWorkOrder.addEditworkOrderDetailsForm.value)
        .subscribe(
          res => {
            console.log("new WorkOrderDetails Create");
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
