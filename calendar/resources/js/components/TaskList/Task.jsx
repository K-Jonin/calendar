import React from "react";

export default function Task({ task }) {
    return (
        <>
            <div className="task">
                <p>{task.title}</p>
            </div>
        </>
    );
}
