import { useState, useEffect } from "react";

function useTimePassedSince(targetDateString) {
  const [timePassed, setTimePassed] = useState("");

  useEffect(() => {
    const calculateTimePassed = () => {
      const targetDate = new Date(targetDateString);
      const currentDate = new Date();
      const timeDifference = currentDate - targetDate;
      const secondsPassed = Math.floor(timeDifference / 1000);
      const minutesPassed = Math.floor(secondsPassed / 60);
      const hoursPassed = Math.floor(minutesPassed / 60);
      const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

      if (daysPassed > 0) {
        if (daysPassed < 7) {
          setTimePassed(`${daysPassed} days`);
        } else if (daysPassed < 30) {
          const weeksPassed = Math.floor(daysPassed / 7);
          setTimePassed(`${weeksPassed} weeks`);
        } else if (daysPassed < 365) {
          const monthsPassed = Math.floor(daysPassed / 30);
          setTimePassed(`${monthsPassed} months`);
        } else {
          const yearsPassed = Math.floor(daysPassed / 365);
          setTimePassed(`${yearsPassed} years`);
        }
      } else if (hoursPassed > 0) {
        setTimePassed(`${hoursPassed} hours`);
      } else if (minutesPassed > 0) {
        setTimePassed(`${minutesPassed} minutes`);
      } else {
        setTimePassed(`${secondsPassed} seconds`);
      }
    };

    calculateTimePassed();

    // Update time passed every minute
    const intervalId = setInterval(calculateTimePassed, 60000);

    return () => clearInterval(intervalId);
  }, [targetDateString]);

  return timePassed;
}

export default useTimePassedSince;
