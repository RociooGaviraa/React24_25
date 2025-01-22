import React from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const App = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center font-bold  text-3xl text-blue-700 mb-8">
        Gestor de Task App
      </h1>
      <TaskForm />
      <TaskList />
    </div>
  );
};

export default App;
