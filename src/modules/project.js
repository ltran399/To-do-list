export default class Project{
    constructor(name){
        this.name = name;
        this.todos = [];
    }

    addTodo(todo){
        this.todos.push(todo);
    }

    deleteTodo(todoTitle){
        this.todos = this.todos.filter((todo) => todo.title !== todoTitle);
    }
}