import React, { useEffect, useState } from "react";
import Task from "./Task";
import axios from "axios";

export default function TaskList({ generalDate, setIsVisibleTaskForm }) {
    const [tasks, setTasks] = useState([]);

    // タスクの取得
    useEffect(() => {
        const fetchTasks = async () => {
            const response = await axios.get(`/api/calendar/${generalDate}`);
            setTasks(
                // 終了時刻の昇順で格納
                response.data.sort((task1, task2) => {
                    return (
                        new Date(task1.task_date + " " + task1.finish_time) -
                        new Date(task2.task_date + " " + task2.finish_time)
                    );
                })
            );
        };
        fetchTasks();
    }, [generalDate]);

    // クリックで非表示
    const clickVisible = () => {
        setIsVisibleTaskForm(true);
    };

    return (
        <div className="taskList">
            <div className="taskListBox">
                <div className="taskWrapper">
                    {tasks.map((task) => (
                        <Task task={task} key={task.id} />
                    ))}
                </div>
                <button className="addTaskButton" onClick={clickVisible}>
                    +
                </button>
            </div>
        </div>
    );
}
