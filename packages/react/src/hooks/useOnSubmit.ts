import { useState } from 'react';

const useOnSubmit = <T>(_onClick?: (e: T) => any | Promise<any>) => {
    const [submitting, setSubmitting] = useState(false);

    const onSubmit = async (e: T) => {
        const possiblePromise = _onClick?.(e);
        if (
            typeof possiblePromise === 'object' &&
            typeof possiblePromise?.then === 'function'
        ) {
            setSubmitting(true);
            await possiblePromise;
            setSubmitting(false);
        }
    };

    return { submitting, onSubmit };
};

export default useOnSubmit;
