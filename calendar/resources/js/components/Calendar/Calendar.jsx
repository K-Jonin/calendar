import React, { useEffect, useState } from "react";
import Days from "./Days";

export default function Calendar({ generalDate, setGeneralDate }) {
    const [daysOfTheWeek, setDaysOfTheWeek] = useState([]);

    /**
     * 月に応じた日にち情報を作成
     */
    useEffect(() => {
        const date = String(generalDate).split("-");
        // 該当月の1日の曜日を取得
        const dayOfTheWeekNum = new Date(`${date[0]}-${date[1]}-01`).getDay();
        // 該当月が何日あるかを取得
        const dateCountByMonth = new Date(date[0], date[1], 0).getDate();
        // 日にちを取得
        const days = [...Array(42)].map((_, i) =>
            i >= dayOfTheWeekNum && i < dateCountByMonth + dayOfTheWeekNum
                ? i - dayOfTheWeekNum + 1
                : 0
        );
        // 日にちを週ごとに分割し挿入
        setDaysOfTheWeek(
            [...Array(6)].fill().map((_, i) => days.slice(i * 7, i * 7 + 7))
        );
    }, [generalDate]);

    return (
        <div className="calendar">
            <table>
                <thead>
                    <tr>
                        <th className="sunday">Sun</th>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th className="saturday">Sat</th>
                    </tr>
                </thead>
                <tbody>
                    {daysOfTheWeek.map((days, i) => (
                        <tr key={`days_${i}`}>
                            <Days
                                days={days}
                                generalDate={generalDate}
                                setGeneralDate={setGeneralDate}
                            />
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
