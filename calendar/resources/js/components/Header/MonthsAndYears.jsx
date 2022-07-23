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
        <>
            <h2>
                <div>
                    <span className="month">
                        {months[Number(splitDate[1] - 1)]}
                    </span>
                    <span className="year">{splitDate[0]}</span>
                </div>
                <span className="monthNum">{Number(splitDate[1])}</span>
            </h2>
        </>
    );
}
