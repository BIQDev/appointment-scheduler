import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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

  formAppointment = this.fb.group({
    purpose: ['', [Validators.required]],
    date: ['', [Validators.required]],
  });

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
  }

}
