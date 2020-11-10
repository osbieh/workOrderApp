import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import{locations} from './../../../../core/_dataBase/locations-list'
@Component({
  selector: 'app-workorderdetails-edit',
  templateUrl: './workorderdetails-edit.component.html',
  styleUrls: ['./workorderdetails-edit.component.css']
})
export class WorkorderdetailsEditComponent implements OnInit {
  public addEditworkOrderDetailsForm: FormGroup;
  locations = [
    {value:'Select one:', viewValue:'Select one:'},
    {value:'Jerusalem',viewValue:'Jerusalem'},
    {value:'Bethlehem',viewValue:'Bethlehem'},
    {value:'Ramallah',viewValue:'Ramallah'},
    {value:'Hebron',viewValue:'Hebron'}
];
  constructor(private fb:FormBuilder, public dialogRef: MatDialogRef<WorkorderdetailsEditComponent>,) { }

  ngOnInit(): void {
    this.createForm();
  

  }

  private createForm() {
    this.addEditworkOrderDetailsForm = this.fb.group({
      id: [''],
      location:['', Validators.required],
      description:['', Validators.required],
      progress: ['', Validators.required],
    });
  
   
  }

  onSubmit(addWorkOrder) {


    this.dialogRef.close();
  }
}
