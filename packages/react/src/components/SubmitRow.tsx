'use client';
import { ReactNode } from 'react';
import Button, { ButtonProps } from './Buttons';
import clsx from 'clsx';
import { Icon_Arrow } from './Icons';
import Input, { InputProps } from './Input';
import Expandable from './Expandable';

interface SubmitRowProps {
    buttonProps: Omit<ButtonProps, 'children'> & {
        children?: ReactNode;
    };
    inputProps?: InputProps;
    children?: ReactNode;
    afterChildren?: ReactNode;
    valid: boolean;
    error?: ReactNode;
    submitButtonPosition?: 'right' | 'under';
}

export default function SubmitRow({
    buttonProps: {
        className,
        children: buttonChildren,
        disabled,
        onClick,
        ..._buttonProps
    },
    inputProps: { maxLength = 50, ...inputProps } = {},
    children,
    afterChildren,
    valid,
    error,
    submitButtonPosition = 'right',
}: SubmitRowProps) {
    const buttonProps: ButtonProps = {
        tabIndex: valid ? 0 : -1,
        ..._buttonProps,
        onClick,
        disabled,
    };
    const buttonClassName = clsx(
        'h-min text-xl !transition-all w-0 !px-0 mx-0 overflow-hidden items-center flex justify-center',
        {
            '!bg-transparent border-opacity-0 !border-transparent': !valid,
        }
    );

    return (
        <div className="flex flex-col">
            <div
                className={clsx('flex items-center justify-center', {
                    'animate-shake': error,
                })}
            >
                <div className="flex flex-col gap-2">
                    {inputProps && (
                        <Input
                            type="text"
                            canEnter={!disabled}
                            onEnter={() => {
                                if (valid) onClick?.({} as any);
                            }}
                            maxLength={maxLength}
                            {...inputProps}
                            className={clsx(inputProps.className)}
                        />
                    )}
                    {children}
                </div>
                {submitButtonPosition === 'right' && (
                    <Button
                        {...buttonProps}
                        className={clsx(
                            buttonClassName,
                            {
                                'ml-4 w-16': valid && !error,
                            },
                            className
                        )}
                    >
                        {buttonChildren || <Icon_Arrow size={30} />}
                    </Button>
                )}
            </div>
            <div className="flex">
                <Expandable
                    expandedClassName={clsx('mt-2', {
                        'min-h-[2.25rem]': submitButtonPosition === 'under',
                    })}
                >
                    {afterChildren}
                </Expandable>
                {submitButtonPosition === 'under' && (
                    <Button
                        {...buttonProps}
                        className={clsx(
                            buttonClassName,
                            'ml-auto w-12 !h-0 !p-0 ',
                            {
                                '!h-8 mt-2': valid,
                            },
                            className
                        )}
                    >
                        {buttonChildren || <Icon_Arrow size={24} />}
                    </Button>
                )}
            </div>
            <Expandable>
                {error && <p className="mt-4 text-red-400">{error}</p>}
            </Expandable>
        </div>
    );
}
