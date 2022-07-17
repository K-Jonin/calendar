import React from "react";
import Day from "./Day";

export default function Days({ days, generalDate, setGeneralDate }) {
    return (
        <>
            {days.map((day, i) => (
                <td key={`day_${i}`}>
                    <Day
                        day={day}
                        generalDate={generalDate}
                        setGeneralDate={setGeneralDate}
                    />
                </td>
            ))}
        </>
    );
}
