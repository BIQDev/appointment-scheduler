import { Injectable } from '@angular/core';
import * as moment_ from 'moment';
import { Observable, Subject } from 'rxjs';

import { AppointmentModalConfigModel, AppointmentConfigModel, AppointmentPersonModel, AppointmentPersonTimeModel, AppointmentTableConfigModel } from './appointment-scheduler.model';

const moment = moment_;

const appointmentConfigDefault: AppointmentConfigModel = {
    personSelectDisabled: false
}

const appointmentConfigModalDefault: AppointmentModalConfigModel = {
    personLabel: 'Coach',
    communicationDefault: 'email',
}

const appointmentTableConfigDefault: AppointmentTableConfigModel = {
    headerHeight: 30,
    rowHeight: 30
}

@Injectable()
export class AppointmentSchedulerService {

    appointmentConfig: AppointmentConfigModel;

    appointmentTableConfig: AppointmentTableConfigModel;

    appointmentDate: Date;

    appointmentConfigModal: AppointmentModalConfigModel;

    personList: Array<AppointmentPersonModel> = [];

    appointmentPersonTimes: Array<AppointmentPersonTimeModel> = [];
    appointmentPersonTimesChange$ = new Subject();

    componentRefreshRef: () => void;

    hours: Array<string> = [];
    durations: Array<number> = [];

    constructor() {
        this.hours = this.genHours();
        this.durations = this.genDurations();
        this.appointmentDate = new Date();
    }

    getConfig(): AppointmentConfigModel {
        return Object.assign({}, appointmentConfigDefault, this.appointmentConfig);
    }

    setConfig(config: AppointmentConfigModel) {
        this.appointmentConfig = Object.assign({}, config);
    }

    getTableConfig(): AppointmentTableConfigModel {
        return Object.assign({}, appointmentTableConfigDefault);
    }

    getAppointmentDate(): Date {
        return this.appointmentDate;
    }

    setAppointmentDate(date: Date) {
        this.appointmentDate = date;
    }

    prevDate() {
        let prevDate = moment(this.appointmentDate).subtract(1, 'day');
        this.appointmentDate = prevDate.toDate();
    }

    nextDate() {
        let nextDate = moment(this.appointmentDate).add(1, 'day');
        this.appointmentDate = nextDate.toDate();
    }

    getModalConfig(): AppointmentModalConfigModel {
        return Object.assign(
            {},
            appointmentConfigModalDefault,
            this.appointmentConfigModal,
            {
                hours: this.getHoursW15(),
                durations: this.getDurations(),
                persons: this.getPersonList(),
            }
        );
    }

    setModalConfig(config: AppointmentModalConfigModel) {
        this.appointmentConfigModal = Object.assign({}, config);
    }

    setPersonList(personList: Array<AppointmentPersonModel>) {
        this.personList = [].concat(personList);
    }

    getPersonList(): Array<AppointmentPersonModel> {
        return this.personList;
    }

    genDurations(): Array<number> {
        return [30, 45, 60, 75, 90];
    }

    getDurations(): Array<number> {
        return this.durations;
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

    getHours(): string[] {
        return this.hours;
    }

    getHoursW15(): string[] {
        let hoursW15: string[] = []

        for (let i = 0; i < this.hours.length; i++) {
            let hour = this.hours[i];
            hoursW15.push(hour);
            let hourW15 = moment(hour, 'LT', true).add(15, 'minutes').format('LT');
            hoursW15.push(hourW15);
        }

        return hoursW15;
    }

    appointmentPersonSet(record: AppointmentPersonTimeModel) {
        this.appointmentPersonTimes = [ ...this.appointmentPersonTimes, record ];
        this.appointmentPersonTimesChange$.next(record);
    }

}