import React from "react";
import Tasks from "./Tasks";
import AddTaskButton from "./AddTaskButton";

export default function TaskList() {
    return (
        <div>
            <Tasks />
            <AddTaskButton />
        </div>
    );
}
