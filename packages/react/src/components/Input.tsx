'use client';

import { InputHTMLAttributes } from 'react';
import useOnSubmit from '../hooks/useOnSubmit';

export interface InputProps
    extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    canEnter?: boolean;
    onEnter?: () => void | Promise<void>;
    onText?: (text: string) => any;
    componentType?: 'input' | 'textarea';
}

export default function Input({
    disabled: _disabled = false,
    canEnter = true,
    onText,
    onEnter: _onEnter,
    onChange: _onChange,
    onKeyDown: _onKeyDown,
    className,
    componentType = 'input',
    ...rest
}: InputProps) {
    const { onSubmit: onEnter, submitting } = useOnSubmit(_onEnter);
    const disabled = _disabled || submitting;

    const onKeyDown: InputProps['onKeyDown'] = (e) => {
        if (e.key === 'Enter' && onEnter && canEnter) onEnter(e);
        else _onKeyDown?.(e);
    };
    const onChange: InputProps['onChange'] = onText
        ? (e) => onText(e.target.value)
        : _onChange;

    const props = {
        onKeyDown,
        onChange,
        disabled,
        ...rest,
        className,
    };

    if (componentType === 'textarea') return <textarea {...props} />;

    return <input {...props} />;
}
