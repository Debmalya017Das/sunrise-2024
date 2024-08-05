import React, { useState, useEffect } from 'react';
import Task from '../model/Task';
import { initialTasks } from '../utils/TaskList';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    initializeTasks();
  }, []);

  const initializeTasks = () => {
    const initializedTasks = [...initialTasks];
    initializedTasks.forEach((task) => {
      task.completed = false;
    });
    initializedTasks[0].active = true;
    setTasks(initializedTasks);
  };

  const updateTasks = (updatedTasks: Task[]) => {
    setTasks([...updatedTasks]);
  };

  const activateNextTask = (tasks: Task[], completedTaskId: number) => {
    const completedTask = tasks.find(t => t.id === completedTaskId);
    if (completedTask) {
      const nextTaskInGroup = tasks.find(t => t.group === completedTask.group && !t.completed && !t.active);
      if (nextTaskInGroup) {
        nextTaskInGroup.active = true;
      } else {
        const nextGroup = completedTask.group + 1;
        const firstTaskOfNextGroup = tasks.find(t => t.group === nextGroup && !t.completed && !t.active);
        if (firstTaskOfNextGroup) {
          firstTaskOfNextGroup.active = true;
        }
      }
    }
  };

  const handleCompleteTask = (taskId: number) => {
    const activeTasksInOrder = tasks.filter(t => t.active && !t.completed);
    if (activeTasksInOrder.length === 0 || activeTasksInOrder[0].id !== taskId) {
      return;
    }
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        task.completed = true;
        task.active = false;
      }
      return task;
    });

    updateTasks(updatedTasks);
    const inProgressTasks = tasks.filter(t => t.active && !t.completed);
    if (inProgressTasks.length === 0) {
      activateNextTask(updatedTasks, taskId);
    };
  }

  const handleStartTask = (taskId: number) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        task.active = true;
      }
      return task;
    });

    updateTasks(updatedTasks);
  };

  const renderTaskColumn = (title: string, tasks: Task[], renderActionButton: (task: Task, isFirst: boolean) => React.ReactNode) => (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-4">
        {title} <span className="text-sm text-gray-500">({tasks.length})</span>
      </h2>
      {tasks.map((task, index) => (
        <div key={task.id} className="bg-slate-100 border-slate-800 shadow-lg rounded-lg p-4 mb-4">
          <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
          <p className="text-gray-600 mb-4">{task.description}</p>
          {renderActionButton(task, index === 0)}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-200">
      <header className="bg-blue-950 text-white py-4 shadow-lg">
        <h1 className="text-3xl font-bold text-center">Task Board</h1>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {renderTaskColumn('To-Do', tasks.filter(t => !t.active && !t.completed), (task, isFirst) => (
            <button 
              onClick={() => handleStartTask(task.id)}
               disabled={!isFirst}
              className={`font-bold py-2 px-4 rounded ${
                isFirst 
                  ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Start
            </button>
          ))}
          {renderTaskColumn('In Progress', tasks.filter(t => t.active && !t.completed), (task, isFirst) => (
            <button 
              onClick={() => handleCompleteTask(task.id)} 
              disabled={!isFirst}
              className={`font-bold py-2 px-4 rounded ${
                isFirst 
                  ? 'bg-green-500 hover:bg-green-600 text-white' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Done
            </button>
          ))}
          {renderTaskColumn('Completed', tasks.filter(t => t.completed), () => null)}
        </div>
      </main>
    </div>
  );
}
