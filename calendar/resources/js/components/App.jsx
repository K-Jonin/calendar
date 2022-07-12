import moment from "moment";
import React, { useState } from "react";
import Calendar from "./Calendar/Calendar";
import Header from "./Header/Header";
import TaskForm from "./TaskForm/TaskForm";
import TaskList from "./TaskList/TaskList";

export default function App() {
    const [generalDate, setGeneralDate] = useState([
        moment().format("YYYY-MM-DD"),
    ]);

    return (
        <>
            <Header generalDate={generalDate} setGeneralDate={setGeneralDate} />
            {/* <Calendar />
            <TaskList />
            <TaskForm /> */}
        </>
    );
}
