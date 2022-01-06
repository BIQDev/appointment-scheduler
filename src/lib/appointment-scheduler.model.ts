export interface AppointmentPersonModel {
    id: any;
    name: string;
    avatar?: string;
}

export interface AppointmentConfigModel {
    personAllShow?: boolean;
    personSelectDisabled?: boolean;
    tableHeight?: string;
}

export interface AppointmentModalConfigModel {
    purpose?: Array<{ value: any; label: any; }>;
    personLabel?: string;
    persons?: Array<AppointmentPersonModel>;
    communicationDefault?: string;
    appointmentDate?: Date;
    hours?: Array<any>;
    durations?: Array<string>;//In minutes
}
