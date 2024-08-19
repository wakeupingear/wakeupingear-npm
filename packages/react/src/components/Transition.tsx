import clsx from 'clsx';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

export type TransitionType = 'fade' | 'none';

type TransitionProps = Omit<CSSTransitionProps<HTMLElement>, 'children'> & {
    mode: string;
    children: ReactNode;
    type?: TransitionType;
    emptyContent?: ReactNode;
    className?: string;
    initialAnimationDelay?: number;
};

export default function Transition({
    mode,
    children,
    type = 'fade',
    emptyContent = null,
    className,
    initialAnimationDelay = -Infinity,
    ...rest
}: TransitionProps) {
    const nodeRef = useRef<HTMLDivElement>(null);

    // NEVER CHANGE THIS PROP DYNAMICALLY
    const allowedToAnimate = useRef(initialAnimationDelay > 0);
    const [canAnimate, setCanAnimate] = useState(!allowedToAnimate.current);
    if (allowedToAnimate.current) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            const timeout = setTimeout(() => {
                setCanAnimate(true);
            }, 1000);
            return () => clearTimeout(timeout);
        }, []);
    }

    const content = children ? children : emptyContent;
    if (type === 'none') return content;

    const innerContent = (
        <div className={clsx('relative', className)} ref={nodeRef}>
            {content}
        </div>
    );

    return (
        canAnimate ? (
            <SwitchTransition mode="out-in">
                <CSSTransition
                    nodeRef={nodeRef}
                    {...rest}
                    addEndListener={(done: () => void) => {
                        nodeRef.current?.addEventListener(
                            'transitionend',
                            done,
                            false
                        );
                    }}
                    classNames={`transition-${type}`}
                    key={mode}
                >
                    {innerContent}
                </CSSTransition>
            </SwitchTransition>
        ) : (
            innerContent
        )
    ) as ReactNode;
}
