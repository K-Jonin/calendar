import React from "react";

export default function MonthsAndYears({ generalDate }) {
    const splitDate = String(generalDate).split("-");
    const months = [
        "JUNUARY",
        "FEBRUARY",
        "MARCH",
        "APRIL",
        "MAY",
        "JUNE",
        "JULY",
        "AUGUST",
        "SEPTEMBER",
        "OCTOBER",
        "NOVEMBER",
        "DECEMBER",
    ];
    return (
        <div>
            <h2>
                <span className="year">{splitDate[0]}</span>
                <span className="month">
                    {months[Number(splitDate[1] - 1)]}
                </span>
                <span className="monthNum">{splitDate[1]}</span>
            </h2>
        </div>
    );
}
