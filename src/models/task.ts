import TaskDate from "../models/task-date";

// задание
// интерфейс определяет свойства и методы, которые объект должен реализовать
export default interface Task {
    id: number; // номер
    title: string; // название
    description?: string; // описание*
    date: TaskDate; // дата
    color?: string; // выделение*
    completed: boolean; // выполнено/не выполнено
}
