import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { getDatepickerConfig } from './bs-config';
import { StrReplacePipe } from './pipes/str-replace.pipe';

import { AppointmentSchedulerComponent } from './appointment-scheduler/appointment-scheduler.component';
import { HoursPanelComponent } from './hours-panel/hours-panel.component';
import { PersonAppointmentComponent } from './person-appointment/person-appointment.component';
import { AppointmentSchedulerModalComponent } from './appointment-scheduler-modal/appointment-scheduler-modal.component';


@NgModule({
  declarations: [
    AppointmentSchedulerComponent, HoursPanelComponent,
    PersonAppointmentComponent, AppointmentSchedulerModalComponent,
    StrReplacePipe,
  ],
  entryComponents: [AppointmentSchedulerModalComponent],
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
