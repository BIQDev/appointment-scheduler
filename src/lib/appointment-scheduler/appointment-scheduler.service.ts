import { Injectable } from '@angular/core';

@Injectable()
export class AppointmentSchedulerService {


    hours:Array<string> = [];

    constructor() {
        this.hours = this.genHours();
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