import React from "react";
import Calendar from "./Calendar/Calendar";
import Header from "./Header/Header";
import TaskForm from "./TaskForm/TaskForm";
import TaskList from "./TaskList/TaskList";

export default function App() {
    return (
        <>
            <Header />
            <Calendar />
            <TaskList />
            <TaskForm />
        </>
    );
}
