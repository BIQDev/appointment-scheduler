import { Component, OnInit } from '@angular/core';
import { biqHelper } from '@biqdev/ng-helper';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppointmentDetailRecordModel, PersonScheduleModel } from '../appointment-scheduler.model';

@Component({
  selector: 'app-appointment-detail-modal',
  templateUrl: './appointment-detail-modal.component.html',
  styleUrls: ['./appointment-detail-modal.component.scss']
})
export class AppointmentDetailModalComponent implements OnInit {

  renderData: Array<AppointmentDetailRecordModel>;
  data: PersonScheduleModel; 
  appointmentCancelCB: (data: PersonScheduleModel, modalRef: BsModalRef) => void;
  appointmentRescheduleCB: (data: PersonScheduleModel, modalRef: BsModalRef) => void;

  constructor(
    public bsModalRef:BsModalRef,
  ) { }

  ngOnInit() {
  }

  appointmentCancel() {
    if ( biqHelper.isNull(this.data) ) {
      console.error('data should not be null');
      return;
    }

    if ( typeof this.appointmentCancelCB !== 'function' ) {
      console.error('appointmentConfig.appointmentCancelFn should not be null');
      return;
    }

    this.appointmentCancelCB(this.data, this.bsModalRef);
  }

  appointmentReschedule() {
    if ( biqHelper.isNull(this.data) ) {
      console.error('data should not be null');
      return;
    }

    if ( typeof this.appointmentRescheduleCB !== 'function' ) {
      console.error('appointmentConfig.appointmentRescheduleFn should not be null');
      return;
    }

    this.appointmentRescheduleCB(this.data, this.bsModalRef);
  }

}
