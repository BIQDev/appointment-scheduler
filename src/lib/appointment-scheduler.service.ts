import { Injectable } from '@angular/core';
import { biqHelper } from '@biqdev/ng-helper';
import * as moment_ from 'moment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { AppointmentModalConfigModel, AppointmentConfigModel, AppointmentPersonModel, PersonScheduleModel, AppointmentTableConfigModel, AppointmentPersonFilterModel } from './appointment-scheduler.model';

const moment = moment_;

const appointmentConfigDefault: AppointmentConfigModel = {
    personSelectDisabled: false
}

const appointmentConfigModalDefault: AppointmentModalConfigModel = {
    personLabel: 'Coach',
    communicationDefault: 'Email',
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
    personListFilter: AppointmentPersonFilterModel;
    personListFitered$: BehaviorSubject<Array<AppointmentPersonModel>> = new BehaviorSubject( [] );

    personSchedules: Array<PersonScheduleModel> = [];
    personSchedulesChange$ = new Subject(); //Subject<Array<PersonScheduleModel>> | Subject<PersonScheduleModel>

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

    getAppointmentPurposeLabel( value: any ) : string {
        const arrPurposes: Array<{value: any, label: any}> = this.getModalConfig().purposes;
        if ( arrPurposes.length ) {
            for ( var i = 0; i < arrPurposes.length; i++ ) {
                let purpose = arrPurposes[i];
                if ( purpose.value === value ) {
                    return purpose.label;
                }
            }
        }
        return '';
    }

    setModalConfig(config: AppointmentModalConfigModel) {
        this.appointmentConfigModal = Object.assign({}, config);
    }

    setPersonList(personList: Array<AppointmentPersonModel>) {
        this.personList = [...personList];
        this.setPersonListFilter(this.personListFilter);//Refresh filter
    }

    setPersonListFilter(filter: AppointmentPersonFilterModel) {
        this.personListFilter = filter;//For use another FN
        let filtered = this.personList;
        if ( !biqHelper.isNull(filter) ) {
            filtered = filtered
                .filter( e => {
                    return e[filter.fieldName] === filter.value;
                } )
        }
        this.personListFitered$.next(filtered);
    }

    getPersonList(): Array<AppointmentPersonModel> {
        return this.personList;
    }

    getPersonById( id: any ): AppointmentPersonModel {
        for ( let i = 0; i < this.personList.length; i++ ) {
            const personItem = this.personList[i];
            if ( personItem.id === id ) {
                return personItem;
            }
        }
        return {id: null, name: null};
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

    addPersonSchedule(record: PersonScheduleModel) {
        this.personSchedules = [ ...this.personSchedules, record ];
        this.personSchedulesChange$.next(record);
    }

    setPersonSchedule(records: Array<PersonScheduleModel>) {
        this.personSchedules = [ ...records ];
        this.personSchedulesChange$.next(records);
    }

}