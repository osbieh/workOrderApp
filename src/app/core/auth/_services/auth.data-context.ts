import { UsersTable } from './../_dataBase/users.table';
import { WorkOrderTable} from './../_dataBase/workOrder.table';
// Wrapper class
export class AuthDataContext {
    public static users: any = UsersTable.users;
    public static workOrders: any = WorkOrderTable.workOrders;
}