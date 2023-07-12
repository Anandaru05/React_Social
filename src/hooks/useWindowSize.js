import { useState, useEffect } from "react";

const useWindowSize = () =>{
    const [WindowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined
    });

    useEffect(() => {
        const handleResize = () =>{
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }
        handleResize();

        window.addEventListener("reSize", handleResize);

        return () => window.removeEventListener("reSize", handleResize);
    }, [])

    return WindowSize;
    
}

export default useWindowSize