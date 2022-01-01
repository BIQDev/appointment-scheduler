import { Component, OnInit, Input } from '@angular/core';
import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import { AppointmentSchedulerService } from '../appointment-scheduler.service';
import { BiqAppointmentConfigModel, BiqAppointmentPersonModel } from '../appointment-scheduler.model';

const biqAppointmentConfigDefault: BiqAppointmentConfigModel = {
  personSelectDisabled: false
}

@Component({
  selector: 'biq-appointment-scheduler',
  templateUrl: './appointment-scheduler.component.html',
  styleUrls: ['./appointment-scheduler.component.scss'],
  providers: [AppointmentSchedulerService]
})
export class AppointmentSchedulerComponent implements OnInit {

  @Input() biqAppointmentConfig: BiqAppointmentConfigModel = Object.assign({}, biqAppointmentConfigDefault);
  @Input() personList: Array<BiqAppointmentPersonModel>;

  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  personSelected: number;

  constructor(private service: AppointmentSchedulerService) { }

  ngOnInit() {
    if ( this.getConfig().personAllShow ) {
      this.personSelected = -1;
    } else {
      this.personSelected = this.service.personList[0].id;
    }

    this.service.setPersonList(this.personList);

  }

  getConfig(): BiqAppointmentConfigModel {
    return Object.assign({}, biqAppointmentConfigDefault, this.biqAppointmentConfig);
  }

  doSomething() {
    console.log(this.getConfig());
  }

}
