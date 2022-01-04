import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DemoComponent } from './demo/demo.component';
import { HomeComponent } from './home/home.component';

import {AppointmentSchedulerModule} from '@biqdev/appointment-scheduler';
//TODO: Comment demo interal things
import { DemoInternalModule } from './demo-internal/demo-internal.module';

@NgModule({
  declarations: [
    AppComponent,
    DemoComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppointmentSchedulerModule,
    DemoInternalModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
