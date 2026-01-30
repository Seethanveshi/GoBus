import { useEffect, useState } from "react"


function useCountDown(expiryTime) {
    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
        if (!expiryTime) return

        const interval = setInterval(() => {
            const diff = Math.max(0, expiryTime - Date.now())
            setTimeLeft(diff);
        }, 1000);

        return () => clearInterval(interval);

    }, [expiryTime]);

    return timeLeft;
}

export default useCountDown