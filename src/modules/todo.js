import { format} from 'date-fns';

export default class Todo {
    constructor(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
    }

    getFormattedDueDate() {
        return format(this.dueDate, 'yyyy-MM-dd');
    }

    toggleComplete(){
        this.completed = !this.completed;
    }
}