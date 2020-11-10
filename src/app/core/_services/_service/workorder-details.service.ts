import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { WorkOrderDetail } from '../../_models/workOrderDetail.model';

const API_WORKORDERDETAILS_URL = 'api/workOrderDetails';

@Injectable(
)
export class WorkorderdetailsService {

  constructor(private http: HttpClient) { }


  // READ
	getAllWorkorderdetails(): Observable<WorkOrderDetail[]> {
		return this.http.get<[]>(API_WORKORDERDETAILS_URL);
	}

	getWorkOrderDetialsById(wrkOrderDetailsId: number): Observable<WorkOrderDetail> {
		return this.http.get<WorkOrderDetail>(API_WORKORDERDETAILS_URL + `/${wrkOrderDetailsId}`);
	}

	getWorkOrdersDetialsByWorksOrderId(workOrderId: number): Observable<WorkOrderDetail[]> {
		return this.http.get<[WorkOrderDetail]>(API_WORKORDERDETAILS_URL )
		.pipe(map(data => data.filter(workorder => workorder.workOrderId== workOrderId) ));
	}

	createWorkOrderDetail(workOrderDetails:WorkOrderDetail): Observable<WorkOrderDetail> {
		const httpHeaders = new HttpHeaders();
		httpHeaders.set('Content-Type', 'application/json');
		return this.http.post<WorkOrderDetail>(API_WORKORDERDETAILS_URL,workOrderDetails, { headers: httpHeaders });
	}
	// UPDATE => PUT: update the WorkOrder on the server
	updateWorkOrderDetail(workOrderDetail: WorkOrderDetail): Observable<any> {
		const httpHeaders = new HttpHeaders();
		httpHeaders.set('Content-Type', 'application/json');
		return this.http.put(API_WORKORDERDETAILS_URL, workOrderDetail, { headers: httpHeaders });
	}

	

}
