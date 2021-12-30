import { Component, OnInit, Input } from '@angular/core';
import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import { AppointmentSchedulerService } from '../appointment-scheduler.service';
import { BiqAppointmentConfigModel, PersonModel } from './appointment-scheduler.model';

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

  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  personList:Array<PersonModel> = [
    {id: 1, label: 'Bayu'},
    {id: 2, label: 'Candra'}
  ];

  personSelected: number = this.personList[0].id;

  constructor(service: AppointmentSchedulerService) { }

  ngOnInit() {
    if ( this.getConfig().personAllShow ) {
      this.personSelected = -1;
    }
  }

  getConfig(): BiqAppointmentConfigModel {
    return Object.assign({}, biqAppointmentConfigDefault, this.biqAppointmentConfig);
  }

  doSomething() {
    console.log(this.getConfig());
  }

}
