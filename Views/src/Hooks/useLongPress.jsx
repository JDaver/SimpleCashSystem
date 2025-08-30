import { useRef, useCallback } from "react";

export function useLongPress(callback,ms = 1000){
    const timerRef = useRef(null);
    
    const startEvent = useCallback(() => {
        timerRef.current = setTimeout(callback, ms);
    },[callback,ms]);

    const clearEvent = useCallback(() => {
        if(timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    },[]);

    return {
        onMouseDown: startEvent,
        onMouseUp: clearEvent,
        onMouseLeave: clearEvent,
        onTouchStart: startEvent,
        onTouchEnd: clearEvent,
    };
}