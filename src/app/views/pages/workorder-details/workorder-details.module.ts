import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkorderdetailsListComponent } from './workorderdetails-list/workorderdetails-list.component';
import { WorkMaterialModule } from 'src/app/work-material.module';

import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [WorkorderdetailsListComponent],
  imports: [
    CommonModule,
    WorkMaterialModule,
  
    ReactiveFormsModule,

  ],
  exports:[WorkorderdetailsListComponent]
})
export class WorkorderDetailsModule { }
