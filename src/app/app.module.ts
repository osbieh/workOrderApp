import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';


// Angular in memory
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

//services
import { FakeApiService } from './core/_mermoryDb/fake-api.service';
import { AuthService } from './core/auth';

//modules
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './views/pages/auth/auth.module';
import { WorkOrderService } from './core/work-order';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
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
     WorkOrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
