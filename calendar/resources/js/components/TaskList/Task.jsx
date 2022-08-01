import React from "react";

export default function Task({
    task,
    isVisibleTaskForm,
    setIsVisibleTaskForm,
    postData,
    setPostData,
    generalDate,
}) {
    // タスクの押下
    const clickTask = () => {
        setPostData({
            ...postData,
            ...task,
            task_date: generalDate,
        });
        setIsVisibleTaskForm({
            ...isVisibleTaskForm,
            visible: true,
            isEdit: true,
        });
    };

    return (
        <>
            <div className="task" onClick={clickTask}>
                <p>{task.title}</p>
            </div>
        </>
    );
}
