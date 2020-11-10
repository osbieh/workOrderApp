import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WorkOrderDetail } from 'src/app/core/_models/workOrderDetail.model';
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
  workerOrderDetailsId:number;

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
    console.log(this.data);
    this.workerOrderId=this.data.workerOrderId;
    this.createForm();

   

    if(this.data.workerOrderDetailsId){
      console.log("===>",this.data);
      this.workerOrderDetailsId=this.data.workerOrderDetailsId;
      this.fetchRecord();
    }
      
    

    
     
    
  }

  private createForm() {
    this.addEditworkOrderDetailsForm = this.fb.group({
      id: [''],
      location: ['', Validators.required],
      description: ['', Validators.required],
      progress: ['', Validators.required],
    });
  }


  public fetchRecord() {
    this.workorderdetailsService
      .getWorkOrderDetialsById(this.workerOrderDetailsId)
      .subscribe(
        data => {
          this.fillForm(data);
        }

      );

  }

  private fillForm(parsedData: WorkOrderDetail) {

    this.addEditworkOrderDetailsForm.setValue({
      id: parsedData.id,
      location:parsedData.location,
      description:parsedData.description,
      progress: parsedData.progress
    });

  }
  

  onSubmit(addWorkOrder) {

    if (addWorkOrder.addEditworkOrderDetailsForm.valid) {

        addWorkOrder.addEditworkOrderDetailsForm.value.workOrderId=this.workerOrderId;
        

        if(this.workerOrderDetailsId){
          this.workorderdetailsService.updateWorkOrderDetail(addWorkOrder.addEditworkOrderDetailsForm.value)
          .subscribe(
            res => {
              console.log("update WorkOrderDetails Create");
              this.onAdd.emit();
             this.dialogRef.close();
            },
            (err: HttpErrorResponse) => {
              console.log(err.error);
              console.log(err.message);
            }
          );
  

        }else{

          addWorkOrder.addEditworkOrderDetailsForm.patchValue(
            {
              id: Math.floor(Math.random() * 1000) + 7,
           
            });
            addWorkOrder.addEditworkOrderDetailsForm.value.workOrderId=this.workerOrderId;
          this.workorderdetailsService.createWorkOrderDetail(addWorkOrder.addEditworkOrderDetailsForm.value)
        .subscribe(
          res => {
            console.log("new WorkOrderDetails Created");
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
}
