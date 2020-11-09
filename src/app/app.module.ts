import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Angular in memory
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

//services
import { FakeApiService } from './core/_mermoryDb/fake-api.service';
import { AuthService } from './core/auth';

//modules
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './views/pages/auth/auth.module';
import { ConfirmService, WorkOrderService,WorkorderdetailsService  } from './core/_services';











@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(FakeApiService, {
			passThruUnknownUrl: true,
			dataEncapsulation: false
		}) ,
    CoreModule,
    AuthModule.forRoot(),
  ],
  providers: [
     AuthService, 
     WorkOrderService,
     WorkorderdetailsService,
     ConfirmService
     
  ],
  bootstrap: [AppComponent],
  exports:[ 
  ]
})
export class AppModule { }
