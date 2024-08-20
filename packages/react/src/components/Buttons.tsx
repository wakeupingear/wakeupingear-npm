import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import useOnSubmit from '../hooks/useOnSubmit';
import { Icon_Loading } from './Icons';
import clsx from 'clsx';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    onClick: (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => any | Promise<any>;
    loading?: boolean;
    loadingElement?: ReactNode;
}

export default function Button({
    children,
    disabled: _disabled = false,
    loading: _loading = false,
    loadingElement = <Icon_Loading color="white" size={30} />,
    onClick: _onClick,
    className,
    ...rest
}: ButtonProps) {
    const { submitting, onSubmit } = useOnSubmit(_onClick);
    const loading = _loading || submitting;
    const disabled = _disabled || loading;

    return (
        <button
            {...rest}
            onClick={onSubmit}
            disabled={disabled}
            className={clsx('flex justify-center items-center', className)}
        >
            {!loading || !loadingElement ? children : loadingElement}
        </button>
    );
}
