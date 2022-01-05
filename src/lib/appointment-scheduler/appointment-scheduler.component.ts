import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import * as _moment from 'moment';

import { AppointmentSchedulerService } from '../appointment-scheduler.service';
import { AppointmentConfigModel, AppointmentModalConfigModel, AppointmentPersonModel } from '../appointment-scheduler.model';
import { AppointmentSchedulerModalComponent } from '../appointment-scheduler-modal/appointment-scheduler-modal.component';

const moment = _moment;

@Component({
  selector: 'biq-appointment-scheduler',
  templateUrl: './appointment-scheduler.component.html',
  styleUrls: ['./appointment-scheduler.component.scss'],
  providers: [AppointmentSchedulerService]
})
export class AppointmentSchedulerComponent implements OnInit {

  @Input() appointmentConfig: AppointmentConfigModel;
  @Input() appointmentModalConfig: AppointmentModalConfigModel;
  @Input() personList: Array<AppointmentPersonModel>;

  @ViewChild('appointmentTableSection', { static: true })
  appointmentTableSection;

  bsModalRef: BsModalRef;

  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  personSelected: number;
  viewDate: Date = new Date();

  constructor(
    public service: AppointmentSchedulerService,
    private modalService: BsModalService,
  ) { }

  ngOnInit() {

    this.service.setConfig(this.appointmentConfig);

    if (this.service.getConfig().personAllShow) {
      this.personSelected = -1;
    } else {
      this.personSelected = this.service.personList[0].id;
    }

    this.service.setModalConfig(this.appointmentModalConfig);

    this.service.setPersonList(this.personList);

    this.syncScroll();

  }

  syncScroll() {
    let hoursPanelEl = this.appointmentTableSection.nativeElement.querySelector('.biq-hours-panel');
    let tableContainerEl = this.appointmentTableSection.nativeElement.querySelector('.appointment-table-container');
    tableContainerEl.addEventListener('scroll', (e) => {
      hoursPanelEl.scrollTop = e.target.scrollTop;
    });
  }

  prevDate() {
    let prevDate = moment(this.viewDate).subtract(1, 'day');
    this.viewDate = prevDate.toDate();
  }

  nextDate() {
    let nextDate = moment(this.viewDate).add(1, 'day');
    this.viewDate = nextDate.toDate();
  }

  newAppointment() {
    const initialState = {
      list: this.service.getModalConfig()
    }
    this.bsModalRef = this.modalService.show(AppointmentSchedulerModalComponent, { class: 'modal-md modal-dialog-centered modal-dialog-scrollable', initialState });
    this.bsModalRef.content.closeBtnName = 'Close';
  }

}
