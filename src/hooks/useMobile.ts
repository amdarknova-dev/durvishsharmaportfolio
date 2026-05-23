import { useState, useEffect } from 'react';

export const useMobile = (breakpoint: number = 768) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
        const onChange = () => setIsMobile(mql.matches);
        mql.addEventListener('change', onChange);
        setIsMobile(mql.matches);
        return () => mql.removeEventListener('change', onChange);
    }, [breakpoint]);

    return isMobile;
};
