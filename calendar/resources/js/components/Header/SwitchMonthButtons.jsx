import React from "react";
import moment from "moment";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

export default function SwitchMonthButtons({ generalDate, setGeneralDate }) {
    /**
     * 次月ボタン押下
     */
    const clickNextButton = () => {
        const pulsMonth = moment(generalDate + " 00:00:00")
            .date("01")
            .add(1, "M")
            .format("YYYY-MM-DD");
        setGeneralDate(pulsMonth);
    };

    /**
     * 前月ボタン押下
     */
    const clickBackButton = () => {
        const minusMonth = moment(generalDate + " 00:00:00")
            .date("01")
            .subtract(1, "M")
            .format("YYYY-MM-DD");
        setGeneralDate(minusMonth);
    };

    return (
        <div className="switchMonthButtons">
            <button onClick={clickBackButton} className="backButton">
                <ArrowCircleLeftIcon fontSize="large" />
            </button>
            <button onClick={clickNextButton} className="nextButton">
                <ArrowCircleRightIcon fontSize="large" />
            </button>
        </div>
    );
}
