import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentSchedulerComponent } from './appointment-scheduler/appointment-scheduler.component';



@NgModule({
  declarations: [AppointmentSchedulerComponent],
  exports: [AppointmentSchedulerComponent],
  imports: [
    CommonModule
  ]
})
export class AppointmentSchedulerModule { }
