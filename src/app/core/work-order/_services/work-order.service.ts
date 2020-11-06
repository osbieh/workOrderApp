import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// RxJS
import { Observable, forkJoin, of } from 'rxjs';
import { WorkOrder } from '../../_models/workOrder.model';

const API_WORKORDER_URL = 'api/workOrders';

@Injectable()
export class WorkOrderService {

  constructor(private http: HttpClient) { }


  // READ
	getAllWorkOrders(): Observable<WorkOrder[]> {
		return this.http.get<[]>(API_WORKORDER_URL);
	}
}
