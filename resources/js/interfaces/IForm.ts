import { ChangeEventHandler, FormEventHandler } from 'react';
import { ICategorias } from './ICategorias';

export interface IForm {
    onSubmit: FormEventHandler<HTMLFormElement>;
    inputs: IFormInputs[];
    buttonSubmit: string;
}

export interface IFormInputs {
    label: string;
    placeholder: string;
    inputType: string;
    inputId: string;
    inputValue?: string;
    inputOnchange?: ChangeEventHandler<HTMLInputElement>;
    selectOnchange?: (value: string) => void;
    selectTitle?: string;
    selectOptions?: ICategorias[];
}
