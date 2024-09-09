import clsx from 'clsx';
import React from 'react';

interface LabelProps {
    children: React.ReactNode;
    title: React.ReactNode;
    className?: string;
    containerClassName?: string;
}

export default function Label({
    children,
    title,
    className,
    containerClassName,
}: LabelProps) {
    return (
        <div className={clsx('flex flex-col gap-1', containerClassName)}>
            {Boolean(title) && (
                <label
                    title={typeof title === 'string' ? title : undefined}
                    className={clsx(
                        'flex items-center gap-1 font-semibold',
                        className
                    )}
                >
                    {title}
                </label>
            )}
            {children}
        </div>
    );
}
