import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import { AppointmentSchedulerService } from '../appointment-scheduler.service';
import { AppointmentConfigModel, AppointmentPersonModel } from '../appointment-scheduler.model';

@Component({
  selector: 'biq-appointment-scheduler',
  templateUrl: './appointment-scheduler.component.html',
  styleUrls: ['./appointment-scheduler.component.scss'],
  providers: [AppointmentSchedulerService]
})
export class AppointmentSchedulerComponent implements OnInit {

  @Input() appointmentConfig: AppointmentConfigModel;
  @Input() personList: Array<AppointmentPersonModel>;

  @ViewChild('appointmentTableSection', {static: true})
  appointmentTableSection;

  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  personSelected: number;

  constructor(private service: AppointmentSchedulerService) { }

  ngOnInit() {

    this.service.setConfig(this.appointmentConfig);

    if ( this.service.getConfig().personAllShow ) {
      this.personSelected = -1;
    } else {
      this.personSelected = this.service.personList[0].id;
    }

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

  doSomething() {
    console.log(this.service.getConfig());
  }

}
