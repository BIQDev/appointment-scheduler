import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { TextPlugin } from 'gsap/TextPlugin';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NgxSelectModule } from 'ngx-select-ex';

import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { getDatepickerConfig } from './bs-config';
import { StrReplacePipe } from './pipes/str-replace.pipe';

import { AppointmentSchedulerComponent } from './appointment-scheduler/appointment-scheduler.component';
import { HoursPanelComponent } from './hours-panel/hours-panel.component';
import { PersonAppointmentComponent } from './person-appointment/person-appointment.component';
import { AppointmentSchedulerModalComponent } from './appointment-scheduler-modal/appointment-scheduler-modal.component';
import { AppointmentDetailModalComponent } from './appointment-detail-modal/appointment-detail-modal.component';
import { BiqMomentPipe } from './pipes/biq-moment.pipe';
import { BiqMinsToHoursPipe } from './pipes/mins-to-hours.pipe';
import { BiqJsonSerializePipe } from './pipes/json-serialize.pipe';
import { AppointmentSchedulerService } from './appointment-scheduler.service';

gsap.registerPlugin(Draggable, TextPlugin);
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;


@NgModule({
  declarations: [
    AppointmentSchedulerComponent, HoursPanelComponent,
    PersonAppointmentComponent, AppointmentSchedulerModalComponent, AppointmentDetailModalComponent,
    StrReplacePipe, BiqMomentPipe, BiqMinsToHoursPipe, BiqJsonSerializePipe,
  ],
  entryComponents: [AppointmentSchedulerModalComponent, AppointmentDetailModalComponent],
  exports: [AppointmentSchedulerComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    FontAwesomeModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    NgxMaskModule.forRoot(),
    NgxSelectModule,
  ],
  providers: [
    { provide: BsDatepickerConfig, useFactory: getDatepickerConfig },
    AppointmentSchedulerService
  ]
})
export class AppointmentSchedulerModule { }
