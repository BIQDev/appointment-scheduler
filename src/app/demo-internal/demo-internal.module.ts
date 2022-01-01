import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentSchedulerModule } from '../appointment-scheduler/appointment-scheduler.module';
import { DemoInternalComponent } from './demo-internal/demo-internal.component';



@NgModule({
  declarations: [DemoInternalComponent],
  imports: [
    CommonModule,
    AppointmentSchedulerModule
  ],
  exports: [
    DemoInternalComponent,
  ]
})
export class DemoInternalModule { }
