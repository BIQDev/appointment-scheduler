import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { AppointmentSchedulerService } from '../appointment-scheduler.service';
import { AppointmentConfigModel, AppointmentModalConfigModel, AppointmentReadyModel } from '../appointment-scheduler.model';
import { AppointmentSchedulerModalComponent } from '../appointment-scheduler-modal/appointment-scheduler-modal.component';
import { biqHelper } from '@biqdev/ng-helper';

@Component({
  selector: 'biq-appointment-scheduler',
  templateUrl: './appointment-scheduler.component.html',
  styleUrls: ['./appointment-scheduler.component.scss'],
  providers: [AppointmentSchedulerService]
})
export class AppointmentSchedulerComponent implements OnInit {

  @Input() appointmentConfig: AppointmentConfigModel;
  @Input() appointmentModalConfig: AppointmentModalConfigModel;
  @Output() appointmentReady = new EventEmitter<AppointmentReadyModel>();

  @ViewChild('appointmentTableSection', { static: true })
  appointmentTableSection;

  bsModalRef: BsModalRef;

  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  personSelected: number;

  constructor(
    public service: AppointmentSchedulerService,
    private modalService: BsModalService,
  ) { }

  ngOnInit() {

    this.service.setConfig(this.appointmentConfig);

    if (this.service.getConfig().personAllShow) {
      this.personSelected = null;
    } else {
      this.personSelected = this.service.personList[0].id;
    }

    this.service.setModalConfig(this.appointmentModalConfig);

    this.syncScroll();

    this.appointmentReady.emit({
      service: this.service
    });

  }

  personChange(personId) {
    if ( !biqHelper.isNull(personId) ) {
      this.service.setPersonListFilter({fieldName: 'id', value: personId});
    } else {
      this.service.setPersonListFilter(null);
    }

    const callback = this.service.getConfig().personListChangeCallback;
    if ( typeof callback === 'function' ) {
      callback(personId);
    }
  }

  getPersons() {

  }

  dateChange( date: Date ) {
    this.service.setAppointmentDate( date );
    const callback = this.service.getConfig().dateChangeCallback;
    if(typeof callback === 'function') callback(date);
  }

  syncScroll() {
    let hoursPanelEl = this.appointmentTableSection.nativeElement.querySelector('.biq-hours-panel');
    let tableContainerEl = this.appointmentTableSection.nativeElement.querySelector('.appointment-table-container');
    tableContainerEl.addEventListener('scroll', (e) => {
      hoursPanelEl.scrollTop = e.target.scrollTop;
    });
  }

  newAppointment() {
    const initialState = {
      list: Object.assign(
        {},
        this.service.getModalConfig(),
        {
          appointmentDate: this.service.getAppointmentDate()
        }
      )
    }
    this.bsModalRef = this.modalService.show(AppointmentSchedulerModalComponent, { class: 'modal-md modal-dialog-centered modal-dialog-scrollable', initialState });
    this.bsModalRef.content.closeBtnName = 'Close';
  }

}
