import React from 'react';
import classNames from 'classnames';
import get from 'lodash.get';

import {
    RegisterOptions,
    DeepMap,
    FieldError,
    UseFormRegister,
    Path, FieldValues,
} from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Input, InputProps } from './input';
import { FormErrorMessage } from './form-error-message';

export type FormInputProps<TFormValues extends FieldValues> = {
    name: Path<TFormValues>;
    icon: JSX.Element;
    rules?: RegisterOptions;
    register?: UseFormRegister<TFormValues>;
    errors?: Partial<DeepMap<TFormValues, FieldError>>;
} & Omit<InputProps, 'name'>;

export const FormInput = <TFormValues extends Record<string, unknown>>({
       name,
       icon,
       register,
       rules,
       errors,
       className,
       ...props
    }: FormInputProps<TFormValues>): JSX.Element => {

    // If the name is in a FieldArray, it will be 'fields.index.fieldName' and errors[name] won't return anything, so we are using lodash get
    const errorMessages = get(errors, name);
    const hasError = !!(errors && errorMessages);

    return (
        <div className="d-flex flex-column form-container">
            <div className="d-flex flex-row align-items-center form-container">
                <div>{icon}</div>
                <div className="form-outline flex-fill mx-2">
                    <Input
                        name={name}
                        aria-invalid={hasError}
                        className={classNames( {
                            'form-control': true,
                            'transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 border-red-600 hover:border-red-600 focus:border-red-600 focus:ring-red-600': hasError
                        })}
                        {...props}
                        {...(register && register(name, rules))}
                    />
                </div>
            </div>
            <div className="d-flex flex-row-reverse err-container">
                <span className={"validationErrors"}>

                    <ErrorMessage
                        errors={errors}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        name={name as any}
                        render={({ message }) => (
                            <FormErrorMessage className="mt-1">{message}</FormErrorMessage>
                        )}
                    />

                </span>
            </div>
        </div>
    );
};
