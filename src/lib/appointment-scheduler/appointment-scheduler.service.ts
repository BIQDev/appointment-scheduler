import { Injectable } from '@angular/core';
import { BiqAppointmentPersonModel } from './appointment-scheduler.model';

@Injectable()
export class AppointmentSchedulerService {

    personList:Array<BiqAppointmentPersonModel> = [];

    hours:Array<string> = [];

    constructor() {
        this.hours = this.genHours();
    }

    setPersonList(personList: Array<BiqAppointmentPersonModel>) {
        this.personList = Object.assign({}, personList);
    }

    getPersonList(): Array<BiqAppointmentPersonModel> {
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