import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first ,finalize, tap } from 'rxjs/operators';

 import { AuthService } from '../../../../core/auth';

@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
       
    ) {
        // redirect to home if already logged in
        // if (this.authService.currentUserValue) { 
        //     this.router.navigate(['/']);
        // }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authService.login(this.f.username.value, this.f.password.value)
            .pipe(
                tap(user => {
					if (user) {
					    localStorage.setItem('authToken',user.token);
                      //  this.router.navigateByUrl(this.returnUrl); // Main page
                        this.router.navigate([this.returnUrl]);
					} else {
                        //todo add alert Message toaster 
					console.log("Invalid Login");
					}
                }),
                finalize(() => {
					this.loading = false;
                })
                )
            .subscribe( );
    }
}

