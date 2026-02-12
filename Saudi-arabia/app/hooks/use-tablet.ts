'use client';

import { useEffect, useState } from "react";

const Tablet_BREAKPOINT = 1020;

export function useTablet() {
    const [isTablet, setIsTablet] = useState(
        typeof window !== 'undefined' ? window.innerWidth < Tablet_BREAKPOINT : false
    );

    useEffect(() => {
        if (typeof window === 'undefined') return

        const mql = window.matchMedia(`(max-width: ${Tablet_BREAKPOINT - 1}px)`);
        const handler = (e: MediaQueryListEvent)=> setIsTablet(e.matches)

        mql.addEventListener('change', handler);

        return () => mql.removeEventListener('change', handler);
    }, [])

    return isTablet;

}