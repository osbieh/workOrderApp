import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkorderListComponent } from './workorder-list/workorder-list.component';
import { WorkorderEditComponent } from './workorder-edit/workorder-edit.component';
import { RouterModule, Routes } from '@angular/router';
import {WorkMaterialModule} from './../../../work-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  
  {
    path: '',
    component: WorkorderListComponent
  },

];


@NgModule({
  declarations: [WorkorderListComponent, WorkorderEditComponent],
  imports: [
    CommonModule,
    WorkMaterialModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    WorkorderListComponent
  ]
})
export class WorkOrderModule { }
