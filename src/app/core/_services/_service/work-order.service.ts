import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

	getWorkOrderById(wrkOrderId: number): Observable<WorkOrder> {
		return this.http.get<WorkOrder>(API_WORKORDER_URL + `/${wrkOrderId}`);
	}

	// CREATE =>  POST: add a new 
	createWorkOrder(workOrder:WorkOrder): Observable<WorkOrder> {
		const httpHeaders = new HttpHeaders();
		httpHeaders.set('Content-Type', 'application/json');
		return this.http.post<WorkOrder>(API_WORKORDER_URL,workOrder, { headers: httpHeaders });
	}

	// UPDATE => PUT: update the WorkOrder on the server
	updateWorkOrder(workOrder: WorkOrder): Observable<any> {
		const httpHeaders = new HttpHeaders();
		httpHeaders.set('Content-Type', 'application/json');
		return this.http.put(API_WORKORDER_URL, workOrder, { headers: httpHeaders });
	}

	// DELETE => delete the customer from the server
	deleteWorkOrder(wrkOrderId: number): Observable<any> {
		const url = `${API_WORKORDER_URL }/${wrkOrderId}`;
		return this.http.delete<WorkOrder>(url);
	}

}
