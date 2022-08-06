import moment from "moment";
import React, { useState } from "react";
import Calendar from "./Calendar/Calendar";
import Header from "./Header/Header";
import TaskForm from "./TaskForm/TaskForm";
import TaskList from "./TaskList/TaskList";

export default function App() {
    // 日時情報
    const [generalDate, setGeneralDate] = useState(
        localStorage.getItem("generalDate") ?? moment().format("YYYY-MM-DD")
    );
    // タスクフォームの表示状態
    const [isVisibleTaskForm, setIsVisibleTaskForm] = useState({
        visible: false,
        isEdit: false,
    });
    // ポスト送信するデータ
    const [postData, setPostData] = useState({
        title: "",
        desc: "",
        start_time: "",
        finish_time: "",
        task_date: "",
    });
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
                isVisibleTaskForm={isVisibleTaskForm}
                setIsVisibleTaskForm={setIsVisibleTaskForm}
                postData={postData}
                setPostData={setPostData}
            />
            <TaskForm
                isVisibleTaskForm={isVisibleTaskForm}
                setIsVisibleTaskForm={setIsVisibleTaskForm}
                postData={postData}
                setPostData={setPostData}
            />
        </>
    );
}
