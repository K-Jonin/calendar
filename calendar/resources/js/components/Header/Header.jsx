import React from "react";
import MonthsAndYears from "./MonthsAndYears";
import SwitchMonthButtons from "./SwitchMonthButtons";

export default function Header() {
    return (
        <div className="header">
            <MonthsAndYears />
            <SwitchMonthButtons />
        </div>
    );
}
