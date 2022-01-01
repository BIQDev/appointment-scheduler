import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DemoComponent } from './demo/demo.component';
import { HomeComponent } from './home/home.component';

import {AppointmentSchedulerModule} from '@biqdev/appointment-scheduler';
import { DemoInternalModule } from './demo-internal/demo-internal.module';

@NgModule({
  declarations: [
    AppComponent,
    DemoComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppointmentSchedulerModule,
    DemoInternalModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
