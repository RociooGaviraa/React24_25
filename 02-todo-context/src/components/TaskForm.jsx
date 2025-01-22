import React, { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";

const TaskForm = () => {
  // me traigo el contexto.
  // me traigo las funciones que necesito del contexto.
  const { addTask } = useContext(TaskContext);
  const [taskName, setTaskName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // voy a añadir una tarea
    if (taskName.trim()) {
      addTask({
        id: Date.now(),
        title: taskName,
        completed: false,
      });
      setTaskName("");
    }
  };
  return (
    <form
      className="p-4 bg-gray-200 rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-bold mb-4">Agregar Tarea</h2>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Nombre de la tarea"
        className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Agregar
      </button>
    </form>
  );
};

export default TaskForm;
