import React, { ButtonHTMLAttributes, HTMLProps, ReactNode } from 'react';
import useOnSubmit from '../hooks/useOnSubmit';
import { Icon_Loading } from './Icons';
import clsx from 'clsx';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    onClick: (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => any | Promise<any>;
    loading?: boolean;
    loadingElement?: ReactNode;
    linkProps?: HTMLProps<HTMLAnchorElement>;
    ButtonComponent?: React.ComponentType<any>;
}

export default function Button({
    children,
    disabled: _disabled = false,
    loading: _loading = false,
    loadingElement = <Icon_Loading color="white" size={30} />,
    onClick: _onClick,
    className,
    linkProps,
    ButtonComponent,
    ...rest
}: ButtonProps) {
    const { submitting, onSubmit } = useOnSubmit(_onClick);
    const loading = _loading || submitting;
    const disabled = _disabled || loading;

    const props = {
        ...rest,
        onClick: onSubmit,
        disabled,
        className: clsx(
            'flex justify-center items-center relative transition-opacity',
            'wuig-button',
            {
                'wuig-button-loading': loading,
            },
            className
        ),
        children: (
            <>
                {children}
                <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center transition-opacity pointer-events-none">
                    {loading && loadingElement}
                </div>
            </>
        ),
    };

    if (ButtonComponent) return <ButtonComponent {...linkProps} {...props} />;
    if (linkProps) return <a {...linkProps} {...(props as any)} />;

    return <button {...props} />;
}
