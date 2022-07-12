import React from "react";
import MonthsAndYears from "./MonthsAndYears";
import SwitchMonthButtons from "./SwitchMonthButtons";

export default function Header({ generalDate, setGeneralDate }) {
    return (
        <div className="header">
            <MonthsAndYears generalDate={generalDate} />
            <SwitchMonthButtons
                generalDate={generalDate}
                setGeneralDate={setGeneralDate}
            />
        </div>
    );
}
