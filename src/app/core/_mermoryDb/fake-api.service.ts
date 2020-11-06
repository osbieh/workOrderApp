// Angular
import { Injectable } from '@angular/core';
// Angular in memory
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
// RxJS
import { Observable } from 'rxjs';
import { WorkDataContext } from '../_contexts/work.data-context';


@Injectable()
export class FakeApiService implements InMemoryDbService {
	/**
	 * Service Constructore
	 */
    constructor() {}
    createDb(reqInfo?: RequestInfo): {} | Observable<{}> | Promise<{}> {
       
        const db = {
			// auth module
            users: WorkDataContext.users,
            //workOrder module
            workOrders:WorkDataContext.workOrders,
            
        }
      
        return db;
    }
}