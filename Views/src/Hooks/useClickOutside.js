import { useEffect } from "react";

export function useClickOutside(ref, onClickOutside){
    useEffect(() => {
        function handleClickOutside(event) {
            if(ref.current && !ref.current.contains(event.target)) {
                onClickOutside();
            }
        }
      
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [ref, onClickOutside]);
}