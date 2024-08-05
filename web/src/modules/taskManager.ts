import Task from '../model/Task';
import { initialTasks } from '../utils/TaskList';

let tasks: Task[] = [];

export function initializeTasks(): void {
  tasks = [...initialTasks];
  const activeGroup = getActiveGroup();
  
  tasks.forEach((task) => {
    task.active = task.group === activeGroup;
    task.completed = false;
  });
}


export function getActiveTasks(): Task[] {
  return tasks
    .filter(task => task.active && !task.completed)
    .map(({ active, ...rest }) => rest as Task); 
}


export function getCompletedTasks(): Task[] {
  return tasks.filter(task => task.completed);
}

export function getAllTasks(): Task[] {
  return tasks;
}

export function completeTask(title: string): void {
  const taskIndex = tasks.findIndex(t => t.title === title);
  if (taskIndex !== -1) {
    tasks[taskIndex].completed = true;
    tasks[taskIndex].active = false;
    const nextTaskInGroup = tasks.find(t => t.group === tasks[taskIndex].group && !t.completed);
    if (nextTaskInGroup) {
      nextTaskInGroup.active = true;
    } else {
      const nextGroup = tasks[taskIndex].group + 1;
      const firstTaskOfNextGroup = tasks.find(t => t.group === nextGroup && !t.completed);
      if (firstTaskOfNextGroup) {
        firstTaskOfNextGroup.active = true;
      }
    }
  }
}


export function createTask(title: string, description: string, persona: string, group: number): void {
  const newId = Math.max(...tasks.map(t => t.id)) + 1;
  const newTask = new Task(newId, title, description, persona, group);
  const activeGroup = getActiveGroup();
  newTask.active = group === activeGroup;
  
  tasks.push(newTask);
}


export function updateTask(id: number, updates: Partial<Task>): void {
  const taskIndex = tasks.findIndex(t => t.id === id);
  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...updates };
  }
}

export function deleteTask(id: number): void {
  tasks = tasks.filter(t => t.id !== id);
}
function getActiveGroup(): number {
  const completedGroups = new Set(getCompletedTasks().map(t => t.group));
  for (let i = 1; i <= 4; i++) {
    if (!completedGroups.has(i)) {
      return i;
    }
  }
  return 4; 
}

