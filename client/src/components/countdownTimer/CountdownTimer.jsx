import React, { useEffect, useState } from 'react';
import "../../styles/BookingPage.css"

const CountdownTimer = ({ minutes, seconds, expiryTime, currentSeconds }) => {
  const [totalSeconds, setTotalSeconds] = useState(0);

  const radius = 12;
  const circumference = 2 * Math.PI * radius;

  const isExpired = currentSeconds <= 0;

  const progress = isExpired || totalSeconds === 0 ? 0
                    : Math.min(currentSeconds / totalSeconds, 1);

  const offset = circumference * (1 - progress);

  useEffect(() => {
        if (!expiryTime) return;

        const total = Math.max(
          Math.floor((expiryTime - Date.now()) / 1000),
          0
        );
        setTotalSeconds(total);
    }, [expiryTime]);

  return (
    <div className="timer-pill-container">
      <svg width="40" height="40">
        <circle
          cx="20"
          cy="20"
          r={radius}
          stroke="#e0e0e0"
          strokeWidth="3.5"
          fill="transparent"
        />
        <circle
          cx="20"
          cy="20"
          r={radius}
          stroke="#00aa00"
          strokeWidth="3.5"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 20 20)"
        />
      </svg>

      <div className="timer-text">
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </div>
    </div>
  );
};

export default CountdownTimer;