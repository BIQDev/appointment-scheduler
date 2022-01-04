import { Injectable } from '@angular/core';
import { AppointmentConfigModel, AppointmentPersonModel } from './appointment-scheduler.model';

const appointmentConfigDefault: AppointmentConfigModel = {
    personSelectDisabled: false
}

@Injectable()
export class AppointmentSchedulerService {

    appointmentConfig: AppointmentConfigModel;

    personList: Array<AppointmentPersonModel> = [];

    hours: Array<string> = [];

    constructor() {
        this.hours = this.genHours();
    }

    getConfig(): AppointmentConfigModel {
        return Object.assign({}, appointmentConfigDefault, this.appointmentConfig);
    }

    setConfig( config: AppointmentConfigModel ) {
        this.appointmentConfig = Object.assign({}, config);
    }

    setPersonList(personList: Array<AppointmentPersonModel>) {
        this.personList = Object.assign({}, personList);
    }

    getPersonList(): Array<AppointmentPersonModel> {
        return this.personList;
    }

    genHours(start: number = 8, interval: number = 30, language = 'en'): Array<string> {
        const ranges: Array<string> = [];
        const date = new Date();
        const format: Intl.DateTimeFormatOptions = {
            hour: 'numeric',
            minute: 'numeric',
        };

        for (let minutes = 0; minutes < 24 * 60; minutes = minutes + interval) {
            date.setHours(0);
            date.setMinutes(minutes + (start * 60));
            ranges.push(date.toLocaleTimeString(language, format));
        }

        return ranges;
    }

}