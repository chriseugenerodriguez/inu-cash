import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// ROUTING
import { AppRoutingModule } from './app-routing.module';

// COMPONENTS
import { AppComponent } from './app.component';

// MODULES
import { HeaderModule, FooterModule } from './shared/components';

// SERVICES
import { EtherscanService } from './shared/services';
import { HomeModule } from './modules/home/home.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    HeaderModule,
    HomeModule,
    FooterModule
  ],
  providers: [
    EtherscanService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
