// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// RxJS
import { Observable, of, forkJoin, BehaviorSubject } from 'rxjs';
import { map, catchError, mergeMap, tap } from 'rxjs/operators';
// Lodash
import { filter, some, find, each } from 'lodash';

// Models
import { User } from '../_models/user.model';

const API_USERS_URL = 'api/users';
@Injectable()
export class AuthService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    // Authentication/Authorization
    login(username: string, password: string): Observable<User> {
        if (!username || !password) {
            return of(null);
        }

        return this.getAllUsers().pipe(

            map((result: User[]) => {
                if (result.length <= 0) {
                    return null;
                }

                const user = find(result, function (item: User) {
                    return (item.username.toLowerCase() === username.toLowerCase() && item.password === password);
                });

                if (!user) {
                    return null;
                }

                user.password = undefined;

                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            })
        );

    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
    logout(): void {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('authToken');
        // this.currentUserSubject = new BehaviorSubject<User>();
    }

    // READ
    getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(API_USERS_URL);
    }


}
