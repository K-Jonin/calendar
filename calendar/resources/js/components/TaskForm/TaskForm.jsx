import React from "react";
import InputTask from "./InputTask";

export default function TaskForm({ isVisibleTaskForm, setIsVisibleTaskForm }) {
    // クリックで非表示
    const clickInvisible = () => {
        setIsVisibleTaskForm(false);
    };

    return (
        <div
            className={`taskForm ${
                isVisibleTaskForm ? "visible" : "invisible"
            }`}
        >
            <div className="bgDark" onClick={clickInvisible}></div>
            <form className="taskFormWrapper">
                <InputTask />
                <button
                    type="button"
                    onClick={clickInvisible}
                    className="closeButton"
                >
                    ｘ
                </button>
            </form>
        </div>
    );
}
