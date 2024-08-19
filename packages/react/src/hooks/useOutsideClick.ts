import { useEffect, useRef } from 'react';

const useOutsideClick = (
    callback: () => any | Promise<void>,
    enabled = true
) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!enabled) return;

        const handleClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                callback();
            }
        };

        document.addEventListener('mousedown', handleClick);

        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, [callback, enabled]);

    return ref;
};

export default useOutsideClick;
