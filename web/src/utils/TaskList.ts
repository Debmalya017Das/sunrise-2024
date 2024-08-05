import Task from '../model/Task';

export const initialTasks: Task[] = [
  new Task(1, 'Initial Setup', 'Set up the development environment.', 'Intern', 1),
  new Task(2, 'Basic Introduction', 'Complete the introductory module.', 'Intern', 1),
  new Task(3, 'Basic Git', 'Learn basic Git commands.', 'Intern', 2),
  new Task(4, 'Git Collaboration', 'Collaborate on a Git repository.', 'Intern', 2),
  new Task(5, 'JavaScript Basics', 'Complete JavaScript basics tutorial.', 'Intern', 3),
  new Task(6, 'JavaScript Project', 'Create a small JavaScript project.', 'Intern', 3),
  new Task(7, 'API Introduction', 'Learn about RESTful APIs.', 'Intern', 4),
  new Task(8, 'API Consumption', 'Consume an API in a project.', 'Intern', 4),
  new Task(9, 'Final Project', 'Complete the final project.', 'Intern', 4),
  new Task(10, 'Project Presentation', 'Present the final project.', 'Intern', 4),
];
