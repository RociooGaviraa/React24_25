import { createContext, useEffect, useState } from "react";

/**
 * Una tarea típica ha de ser:
 * {
 *  id: string,
 *  title: string,
 *  completed: boolean
 *}
 */
// crear el contexto
export const TaskContext = createContext();

// crear el proveedor (provider) del contexto

export const TaskProvider = ({ children }) => {
  // hooks
  const [tasks, setTasks] = useState(() => {
    const savedTask = localStorage.getItem("task");
    return savedTask ? JSON.parse(savedTask) : [];
  });

  useEffect(()=> {
    localStorage.setItem("task", JSON.stringify(tasks));
  }, [tasks]);

  // funciones
  // acciones sobre una tarea:
  // - agregar
  // - eliminar
  // - editar
  // - marcar como completada
  // No olvidar que las tareas han de estar guardadas en el localStorage
  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const removeTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const editTask = (taskId, task) => {}; // para vosotros

  const toggleTaskCompletion = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, removeTask, editTask, toggleTaskCompletion }}
    >
      {children}
    </TaskContext.Provider>
  );
};
