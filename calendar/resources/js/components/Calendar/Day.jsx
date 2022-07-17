import React from "react";
import moment from "moment";

export default function Day({ day, generalDate, setGeneralDate }) {
    const clickDay = (day) => {
        // 数値でない場合処理を終了
        if (isNaN(day)) return;

        const spritGeneralDate = String(generalDate).split("-");
        const newDate = moment(
            `${spritGeneralDate[0]}-${spritGeneralDate[1]}-${
                day < 10 ? "0" + day : day
            } 00:00:00`
        ).format("YYYY-MM-DD");
        setGeneralDate(newDate);
    };
    return (
        <div
            className={!isNaN(day) ? "day" : "hidden"}
            onClick={() => clickDay(day)}
        >
            <span>{day}</span>
        </div>
    );
}
