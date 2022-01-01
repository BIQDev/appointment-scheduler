import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentSchedulerComponent } from './appointment-scheduler/appointment-scheduler.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { getDatepickerConfig } from './bs-config';
import { HoursPanelComponent } from './hours-panel/hours-panel.component';
import { StrReplacePipe } from './pipes/str-replace.pipe';
import { PersonAppointmentComponent } from './person-appointment/person-appointment.component';



@NgModule({
  declarations: [AppointmentSchedulerComponent, HoursPanelComponent, StrReplacePipe,
    PersonAppointmentComponent],
  exports: [AppointmentSchedulerComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    FontAwesomeModule,
    BsDatepickerModule.forRoot(),
  ],
  providers: [{ provide: BsDatepickerConfig, useFactory: getDatepickerConfig }]
})
export class AppointmentSchedulerModule { }
