import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

const TaskList = () => {
  const { tasks, removeTask, editTask, toggleTaskCompletion } = useContext(TaskContext);
  
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md ">
      <h2 className="text-xl font-bold mb-4">Lista de Tareas</h2>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center p-2 mb-2 bg-white rounded-lg shadow-md"
          >
            <span
              className={`flex-1 mx-4 font-bold ${
                task.completed ? "line-through text-gray-600" : "text-blue-500"
              }`}
            >
              {task.title}
            </span>
            <button className="px-3 py-1 bg-blue-700 text-white rounded mr-2 hover:bg-slate-800"
            onClick={()=> toggleTaskCompletion(task.id)}>
              Completar
            </button>
            <button className="px-3 py-1 bg-orange-700 text-white rounded mr-2 hover:bg-slate-800"
            onClick={()=> removeTask(task.id)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
