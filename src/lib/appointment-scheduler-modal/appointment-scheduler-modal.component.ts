import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { biqHelper } from '@biqdev/ng-helper';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppointmentModalConfigModel, AppointmentModalSubmitModel } from '../appointment-scheduler.model';
import { InputModel, InputTypeEnum } from '../dynamic-form/dynamic-form.model';

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
    communicationMethod: ['',[Validators.required]],
  });

  selectedPurposeInputs: Array<Array<InputModel>>;

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

    if (this.list.communicationDefault === 'Text') {
      this.formAppointment.controls.communicationMethod.setValue('Text');
    } else {
      this.formAppointment.controls.communicationMethod.setValue('Email');
    }

  }

  purposeChange(e) {

    this.purposeChangeDeleteControls();

    let purposeVal = this.formAppointment.controls.purpose.value;
    const inputModel = this.list.purposes.filter( e => {
      return e.value === purposeVal;
    } )[0].inputs;

    this.purposeChangeAddControls(inputModel);

    this.selectedPurposeInputs = inputModel;
  }

  purposeChangeAddControls(inputModel: Array<Array<InputModel>>) {
    
    for ( let i = 0 ; i < inputModel.length; i++ ) {
      let inputRow = inputModel[i];
      for ( let j = 0; j < inputRow.length; j ++ ) {
        let input = inputRow[j];

        let ctrl: FormControl;

        switch( input.type ) {
          case InputTypeEnum.Text:
          case InputTypeEnum.TextNumberOnly:
            ctrl = input.required ? 
              new FormControl( '', Validators.required )
              : new FormControl( '' )
            break;
          case InputTypeEnum.Select:
            ctrl = input.required ?
              new FormControl( null, Validators.required )
              : new FormControl( null )
            break;
        }

        this.formAppointment.addControl( input.name, ctrl );
      }
    }

  }

  purposeChangeDeleteControls() {
    
    if ( this.selectedPurposeInputs && this.selectedPurposeInputs.length ) {
      for ( let i = 0 ; i < this.selectedPurposeInputs.length; i++ ) {
        let inputRow = this.selectedPurposeInputs[i];
        for ( let j = 0; j < inputRow.length; j ++ ) {
          let input = inputRow[j];
          this.formAppointment.removeControl(input.name);
        }
      }
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
      relationShipToPatient: controls.relationship.value,
      communicationMethod: controls.communicationMethod.value,
    };

    this.list.submitCallback(submitData, this.formAppointment.valid, this.bsModalRef);

  }

}
