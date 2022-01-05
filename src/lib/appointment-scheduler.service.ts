import { Injectable } from '@angular/core';
import { AppointmentModalConfigModel, AppointmentConfigModel, AppointmentPersonModel } from './appointment-scheduler.model';

const appointmentConfigDefault: AppointmentConfigModel = {
    personSelectDisabled: false
}

const appointmentConfigModalDefault: AppointmentModalConfigModel = {
    personLabel: 'Coach',
    communicationDefault: 'email',
}

@Injectable()
export class AppointmentSchedulerService {

    appointmentConfig: AppointmentConfigModel;

    appointmentConfigModal: AppointmentModalConfigModel;

    personList: Array<AppointmentPersonModel> = [];

    hours: Array<string> = [];
    durations: Array<number> = [];

    constructor() {
        this.hours = this.genHours();
        this.durations = this.genDurations();
    }

    getConfig(): AppointmentConfigModel {
        return Object.assign({}, appointmentConfigDefault, this.appointmentConfig);
    }

    setConfig(config: AppointmentConfigModel) {
        this.appointmentConfig = Object.assign({}, config);
    }

    getModalConfig(): AppointmentModalConfigModel {
        return Object.assign(
            {},
            appointmentConfigModalDefault,
            this.appointmentConfigModal,
            {
                hours: this.getHours(),
                durations: this.getDurations()
            }
        );
    }

    setModalConfig(config: AppointmentModalConfigModel) {
        this.appointmentConfigModal = Object.assign({}, config);
    }

    setPersonList(personList: Array<AppointmentPersonModel>) {
        this.personList = Object.assign({}, personList);
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

    getHours() {
        return this.hours;
    }

}