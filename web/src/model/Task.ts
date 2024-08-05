export default class Task {
    id: number;
    title: string;
    description: string;
    persona: string;
    group: number;
    completed: boolean;
    active: boolean;

  
    constructor(id: number, title: string, description: string, persona: string, group: number, completed: boolean = false,active: boolean= false) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.persona = persona;
      this.group = group;
      this.completed = completed;
      this.active = active;
    }
  }
  