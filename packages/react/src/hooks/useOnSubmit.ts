import { useState } from 'react';

const useOnSubmit = <T>(_onClick?: (e: T) => any | Promise<any>) => {
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e: T) => {
        const possiblePromise = _onClick?.(e);
        if (
            typeof possiblePromise === 'object' &&
            typeof possiblePromise?.then === 'function'
        ) {
            setLoading(true);
            await possiblePromise;
            setLoading(false);
        }
    };

    return { submitting: loading, onSubmit };
};

export default useOnSubmit;
