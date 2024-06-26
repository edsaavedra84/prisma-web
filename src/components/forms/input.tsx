import React, {
    FC,
    forwardRef
} from 'react';
import classNames from 'classnames';

export type InputSize = 'medium' | 'large';
export type InputType = 'text' | 'email' | 'password';

export type InputProps = {
    id: string;
    name: string;
    label: string;
    type?: InputType;
    size?: InputSize;
    className?: string;
    placeholder: string;
};

// Using maps so that the full Tailwind classes can be seen for purging
// see https://tailwindcss.com/docs/optimizing-for-production#writing-purgeable-html

const sizeMap: { [key in InputSize]: string } = {
    medium: 'p-3 text-base',
    large: 'p-4 text-base',
};

export const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            id,
            name,
            label,
            type = 'text',
            size = 'medium',
            className = '',
            placeholder = '',
            ...props
        },
        ref
    ) => {
        return (
            <input
                id={id}
                ref={ref}
                name={name}
                type={type}
                aria-label={label}
                placeholder={placeholder}
                className={classNames([
                    'relative inline-flex w-full rounded leading-none transition-colors ease-in-out placeholder-gray-500 text-gray-700 bg-gray-50 border border-gray-300 hover:border-blue-400 focus:outline-none focus:border-blue-400 focus:ring-blue-400 focus:ring-4 focus:ring-opacity-30',
                    sizeMap[size],
                    className,
                ])}
                {...props}
            />
        );
    }
);
