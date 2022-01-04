import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentSchedulerComponent } from './appointment-scheduler/appointment-scheduler.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { getDatepickerConfig } from './bs-config';
import { HoursPanelComponent } from './hours-panel/hours-panel.component';
import { StrReplacePipe } from './pipes/str-replace.pipe';
import { PersonAppointmentComponent } from './person-appointment/person-appointment.component';
import { ModalModule } from 'ngx-bootstrap/modal';



@NgModule({
  declarations: [AppointmentSchedulerComponent, HoursPanelComponent, StrReplacePipe,
    PersonAppointmentComponent],
  exports: [AppointmentSchedulerComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    FontAwesomeModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [
    { provide: BsDatepickerConfig, useFactory: getDatepickerConfig }
  ]
})
export class AppointmentSchedulerModule { }
