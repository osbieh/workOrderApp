import { HttpClient } from '@angular/common/http';
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

	getWorkOrdersDetialsByWorksOrderId(workOrderId: number): Observable<WorkOrderDetail[]> {
		return this.http.get<[WorkOrderDetail]>(API_WORKORDERDETAILS_URL )
		.pipe(map(data => data.filter(workorder => workorder.workOrderId== workOrderId) ));
	}

	

}
