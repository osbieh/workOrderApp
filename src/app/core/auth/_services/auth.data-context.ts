import { UsersTable } from './../_dataBase/users.table';

// Wrapper class
export class AuthDataContext {
    public static users: any = UsersTable.users;
}