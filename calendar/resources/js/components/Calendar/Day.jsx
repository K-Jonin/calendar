import React from "react";
import moment from "moment";

export default function Day({ day, generalDate, setGeneralDate }) {
    // 日にちクリックイベント
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

    // CSSクラス付与
    const grantClassName = () => {
        let className = "";
        let selectedDay = String(generalDate).split("-")[2];

        if (Number(day) != 0) {
            className = Number(selectedDay) == Number(day) ? "selected" : "day";
        } else {
            className = "hidden";
        }
        return className;
    };

    return (
        <span className={grantClassName()} onClick={() => clickDay(day)}>
            {day}
        </span>
    );
}
