import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkorderListComponent } from './workorder-list/workorder-list.component';
import { WorkorderEditComponent } from './workorder-edit/workorder-edit.component';
import { RouterModule, Routes } from '@angular/router';

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
    RouterModule.forChild(routes),
  ],
  exports:[
    WorkorderListComponent
  ]
})
export class WorkOrderModule { }
