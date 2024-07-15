type Status = 'Done' | 'NotDone';

interface Todo {
    id: number;
    title: string;
    status: Status;
}

class ToDoList {
  private todos: Todo[] = [];
  private nextId: number = 1;

  getTodos(): Todo[] {
      return this.todos;
  }

  addTodo(title: string): void {
      const newTodo: Todo = {
          id: this.nextId++ ,
          title,
          status: 'NotDone'
      };
      this.todos.push(newTodo);
  }

  
  removeTodo(id: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  updateTodoStatus(id: number, status: Status): void {
      const todo = this.todos.find(todo => todo.id === id);
      if (todo) {
          todo.status = status;
      }
  }

  filterTodos(status: Status): Todo[] {
      return this.todos.filter(todo => todo.status === status);
  }

  searchTodos(title: string): Todo[] {
    return this.todos.filter((todo) => todo.title.includes(title));
  }
}

const todoList = new ToDoList();

