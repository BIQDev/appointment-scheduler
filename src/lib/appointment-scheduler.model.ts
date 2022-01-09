import { BsModalRef } from "ngx-bootstrap/modal";
import { AppointmentSchedulerService } from "./appointment-scheduler.service";

export interface AppointmentPersonModel {
    id: any;
    name: string;
    avatar?: string;
}

export interface AppointmentPersonFilterModel {
    fieldName: string;
    value: any;
}

export interface AppointmentTableConfigModel {
    headerHeight: number;
    rowHeight: number;
}

export interface AppointmentConfigModel {
    personAllShow?: boolean;
    personSelectDisabled?: boolean;
    tableHeight?: string;
    personListChangeCallback?: (personId: any) => void;
    dateChangeCallback?: (date: Date) => void;
}

export interface AppointmentReadyModel {
    service: AppointmentSchedulerService
}

export interface AppointmentPersonTimeModel{
    personId: any;
    date: Date;
    hourStart: number;
    minutesStart: number;
    hourEnd: number;
    minutesEnd: number;
    purpose: string;
    callersName: string;
}

export interface AppointmentModalSubmitModel {
    purpose: string;
    date: string;
    time: string;
    duration: string;
    personId: string;
    callersName: string;
    callersEmail: string;
    contactNo: string;
    relationShipToPatient: string;
    communicationMethod: string;
}

export interface AppointmentModalConfigModel {
    purposes?: Array<{ value: any; label: any; }>;
    personLabel?: string;
    persons?: Array<AppointmentPersonModel>;
    communicationDefault?: string;
    appointmentDate?: Date;
    appointmentHour?: string;
    appointmentPerson?: AppointmentPersonModel;
    hours?: Array<any>;
    durations?: Array<string>;//In minutes
    submitCallback?: ( data: AppointmentModalSubmitModel, valid: boolean, bsModalRef: BsModalRef ) => void;
}
