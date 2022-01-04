import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppointmentModalConfigModel } from '../appointment-scheduler.model';

interface ModalListModel {
  appointmentModalConfig: AppointmentModalConfigModel;
}

@Component({
  selector: 'app-appointment-scheduler-modal',
  templateUrl: './appointment-scheduler-modal.component.html',
  styleUrls: ['./appointment-scheduler-modal.component.scss']
})
export class AppointmentSchedulerModalComponent implements OnInit {

  list: AppointmentModalConfigModel = {};

  constructor(
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit() {
  }

}
