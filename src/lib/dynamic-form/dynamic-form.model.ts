import { FormGroup } from "@angular/forms";
import { INgxSelectOption } from "ngx-select-ex";

export enum InputTypeEnum {
    Text = 'text',
    TextNumberOnly = 'text-number-only',
    Date = 'date',
    Select = 'select',
    NgxSelectEx = 'ngx-select-ex',
}

export interface InputSelectOptionsModel {
    value: any;
    label: string;
}


export interface NgxSelectExItemsModel {
    value: any;
    label: string;
    data?: any; // If there any additional data necessary
}

export interface InputModel {
    label: string;
    name: string;
    type: InputTypeEnum,
    required: boolean,
    select_options?: Array<InputSelectOptionsModel>,//For InputTypeEnum.Select
    select_placeholder?: string,
    ngx_select_ex_items?: Array<NgxSelectExItemsModel>,
    ngx_select_ex_change?: (e: INgxSelectOption[], form: FormGroup) => void;
    ngx_select_placeholder?: string,
}