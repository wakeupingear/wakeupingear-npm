import clsx from 'clsx';
import usePrevious from '../hooks/usePrevious';
import { ReactNode } from 'react';

interface ExpandableProps {
    children: ReactNode;
    duration?: '200' | '300' | '500';
    fitWidth?: boolean;
    className?: string;
    expandedClassName?: string;
}

export default function Expandable({
    children,
    duration = '300',
    fitWidth = false,
    className,
    expandedClassName,
}: ExpandableProps) {
    const prev = usePrevious(children);
    const open = Boolean(children);
    const content = open ? children : prev;

    return (
        <div
            className={clsx(
                'min-h-0 grid transition-all',
                {
                    'grid-rows-[1fr]': open,
                    'grid-rows-[0fr] opacity-0': !open,
                    'duration-200': duration === '200',
                    'duration-300': duration === '300',
                    'duration-500': duration === '500',
                    [`${expandedClassName}`]: open && expandedClassName,
                },
                className
            )}
        >
            <div
                className={clsx('min-h-0 overflow-hidden', {
                    'w-fit': fitWidth,
                })}
            >
                {content}
            </div>
        </div>
    );
}
