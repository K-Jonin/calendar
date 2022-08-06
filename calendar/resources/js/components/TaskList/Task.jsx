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
                <p>{showInPartOfTitle(task.title)}</p>
            </div>
        </>
    );
}

/**
 * タイトルが9字超過で一部を非表示
 * @param {string} title
 * @returns {string} 処理後のタイトル
 */
function showInPartOfTitle(title) {
    const result = title.length > 10 ? `${title.substring(0, 8)}...` : title;
    return result;
}
