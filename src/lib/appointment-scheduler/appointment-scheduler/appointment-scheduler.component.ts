import { Component, OnInit, Input } from '@angular/core';
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

  }

  doSomething() {
    console.log(this.service.getConfig());
  }

}
