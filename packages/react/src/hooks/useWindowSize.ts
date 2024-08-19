import { useEffect, useState } from 'react';

const useWindowSize = () => {
    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0,
    });
    const [isClient, setClient] = useState(false);
    useEffect(() => {
        setClient(true);
        const updateWindowSize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener('resize', updateWindowSize);
        updateWindowSize();

        return () => window.removeEventListener('resize', updateWindowSize);
    }, []);

    return { dimensions, isClient };
};

export default useWindowSize;
