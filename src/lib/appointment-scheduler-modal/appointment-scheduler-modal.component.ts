import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { biqHelper } from '@biqdev/ng-helper';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { INgxSelectOption } from 'ngx-select-ex';
import { AppointmentModalConfigModel } from '../appointment-scheduler.model';
import { InputModel, InputTypeEnum } from '../dynamic-form/dynamic-form.model';
//TODO: Implement error notice at the input fields template
@Component({
  selector: 'app-appointment-scheduler-modal',
  templateUrl: './appointment-scheduler-modal.component.html',
  styleUrls: ['./appointment-scheduler-modal.component.scss']
})
export class AppointmentSchedulerModalComponent implements OnInit {

  @ViewChild('formAppointmentElRef', {static: true})
  formAppointmentElRef: ElementRef;

  list: AppointmentModalConfigModel = {
    inputMode: 'New',
    formValues: {},
  };

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
    private cdr: ChangeDetectorRef,
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

    if ( !biqHelper.isNull(this.list.formValues) ) {
      if ( this.list.formValues.hasOwnProperty('purpose') ) {
        this.formAppointment.get('purpose').setValue(this.list.formValues['purpose']);
        this.formAppointmentElRef
          .nativeElement.querySelector('#appointmentPurpose').dispatchEvent(new Event('change'));
        this.cdr.detectChanges();
      }
      setTimeout(() => {
        for ( let key in this.list.formValues ) {
          if ( key === 'purpose' ) continue;
          const formControl = this.formAppointment.get(key);
          if (formControl)
            formControl.setValue(this.list.formValues[key]);
        }
      }, 200);
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
          case InputTypeEnum.Date:
            ctrl = input.required ? 
              new FormControl( '', Validators.required )
              : new FormControl( '' )
            break;
          case InputTypeEnum.Select:
          case InputTypeEnum.NgxSelectEx:
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

  ngxSelectExChange( e: INgxSelectOption[], input: InputModel ) {
    const inputChangeCB = input.ngx_select_ex_change;
    if ( typeof inputChangeCB === 'function' ) {
      inputChangeCB(e, this.formAppointment);
    }
  }

  submit() {

    if (typeof this.list.submitCallback !== 'function') {
      return;
    }

    let submitData: any = this.formAppointment.getRawValue();

    this.list.submitCallback(submitData, this.formAppointment.valid, this.bsModalRef);

  }

}
