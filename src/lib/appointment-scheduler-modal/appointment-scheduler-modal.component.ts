import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { biqHelper } from '@biqdev/ng-helper';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppointmentModalConfigModel, AppointmentModalSubmitModel } from '../appointment-scheduler.model';

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
    purpose: [null, [Validators.required]],
    date: ['', [Validators.required]],
    time: [null, [Validators.required]],
    duration: [null, [Validators.required]],
    person: [null, [Validators.required]],
    callersName: ['', [Validators.required]],
    callersEmail: ['', [Validators.required]],
    contactNo: ['', [Validators.required]],
    relationship: ['', [Validators.required]],
  });

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.formAppointment.controls.date.setValue(this.list.appointmentDate);
    if (!biqHelper.isNull(this.list.appointmentHour)) {
      this.formAppointment.controls.time.setValue(this.list.appointmentHour);
    }
    if (!biqHelper.isNull(this.list.appointmentPerson)) {
      this.formAppointment.controls.person.setValue(this.list.appointmentPerson.id);
    }
  }

  submit() {

    if (typeof this.list.submitCallback !== 'function') {
      return;
    }

    let controls = this.formAppointment.controls;

    let submitData: AppointmentModalSubmitModel = {
      purpose: controls.purpose.value,
      date: controls.date.value,
      time: controls.time.value,
      duration: controls.duration.value,
      personId: controls.person.value,
      callersName: controls.callersName.value,
      callersEmail: controls.callersEmail.value,
      contactNo: controls.contactNo.value,
      relationShipToPatient: controls.relationship.value
    };

    this.list.submitCallback(submitData, this.formAppointment.valid, this.bsModalRef);

  }

}
