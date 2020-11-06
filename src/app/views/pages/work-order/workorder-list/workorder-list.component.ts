import { Component, OnInit } from '@angular/core';
import { WorkOrderService } from 'src/app/core/work-order/_services/work-order.service';



@Component({
  selector: 'app-workorder-list',
  templateUrl: './workorder-list.component.html',
  styleUrls: ['./workorder-list.component.css']
})
export class WorkorderListComponent implements OnInit {

  constructor(private workOrderService:WorkOrderService) { }

  ngOnInit() {

    this.workOrderService.getAllWorkOrders().subscribe(x=>{
      console.log("WorkOrder <==> ",x);
    });

  }

}
