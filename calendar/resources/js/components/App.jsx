import moment from "moment";
import React, { useState } from "react";
import Calendar from "./Calendar/Calendar";
import Header from "./Header/Header";
import TaskForm from "./TaskForm/TaskForm";
import TaskList from "./TaskList/TaskList";

export default function App() {
    // 日時情報
    const [generalDate, setGeneralDate] = useState(
        moment().format("YYYY-MM-DD")
    );
    // タスクフォームの表示状態
    const [isVisibleTaskForm, setIsVisibleTaskForm] = useState(false);

    return (
        <>
            <Header generalDate={generalDate} setGeneralDate={setGeneralDate} />
            <Calendar
                generalDate={generalDate}
                setGeneralDate={setGeneralDate}
            />
            <TaskList
                generalDate={generalDate}
                setGeneralDate={setGeneralDate}
                setIsVisibleTaskForm={setIsVisibleTaskForm}
            />
            <TaskForm
                isVisibleTaskForm={isVisibleTaskForm}
                setIsVisibleTaskForm={setIsVisibleTaskForm}
                generalDate={generalDate}
            />
        </>
    );
}
