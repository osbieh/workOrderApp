import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkorderdetailsListComponent } from './workorderdetails-list/workorderdetails-list.component';
import { WorkMaterialModule } from 'src/app/work-material.module';



@NgModule({
  declarations: [WorkorderdetailsListComponent],
  imports: [
    CommonModule,
    WorkMaterialModule,
  ],
  exports:[WorkorderdetailsListComponent]
})
export class WorkorderDetailsModule { }
