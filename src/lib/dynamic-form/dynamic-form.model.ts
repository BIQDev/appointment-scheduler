export enum InputTypeEnum {
    Text = 'text',
    TextNumberOnly = 'text-number-only',
    Select = 'select',
}

export interface InputSelectOptionsModel {
    value: any;
    label: string;
}

export interface InputModel {
    label: string;
    name: string;
    type: InputTypeEnum,
    required: boolean,
    select_options?: Array<InputSelectOptionsModel>,//For InputTypeEnum.Select
    select_placeholder?: string,
}