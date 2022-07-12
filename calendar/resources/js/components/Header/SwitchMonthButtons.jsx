import React from "react";
import moment from "moment";

export default function SwitchMonthButtons({ generalDate, setGeneralDate }) {
    /**
     * 次月ボタン押下
     */
    const clickNextButton = () => {
        const pulsMonth = moment(generalDate + " 00:00:00")
            .add(1, "M")
            .format("YYYY-MM-DD");
        setGeneralDate(pulsMonth);
    };

    /**
     * 前月ボタン押下
     */
    const clickBackButton = () => {
        const minusMonth = moment(generalDate + " 00:00:00")
            .subtract(1, "M")
            .format("YYYY-MM-DD");
        setGeneralDate(minusMonth);
    };

    return (
        <div className="switchMonthButtons">
            <button onClick={clickBackButton}>BACK</button>
            <button onClick={clickNextButton}>NEXT</button>
        </div>
    );
}
