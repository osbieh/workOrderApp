import { UsersTable } from '../_dataBase/users.table';
import { WorkOrderTable} from '../_dataBase/workOrder.table';
import { WorkOrderDetailsTable } from '../_dataBase/workOrderDetails.table';
// Wrapper class
export class WorkDataContext {
    public static users: any = UsersTable.users;
    public static workOrders: any = WorkOrderTable.workOrders;
    public static workOrderDetails: any = WorkOrderDetailsTable.workOrderDetails;
}
