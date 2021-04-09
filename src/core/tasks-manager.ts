import TaskDate from "../models/task-date";
import fs from 'fs'; // модуль fs
import {Task} from "../models";

class TasksManager {
    private static get storagePath(): string {
        return process.cwd() + '/tasks.json';
    }

    public async getTasksByDate(date: TaskDate): Promise<Task[]> {
        const tasks: Task[] = await this.getAllTasks();
        return tasks.filter(task => task.date === date);
    }

    public async addTask(task: Task): Promise<Task[]> {
        const oldTasks: Task[] = await this.getAllTasks();
        const newTasks = oldTasks.concat(task);
        await fs.promises.truncate(TasksManager.storagePath);
        await fs.promises.writeFile(TasksManager.storagePath, JSON.stringify(newTasks), {encoding:'utf8'})
        return newTasks;
    }

    public async deleteTaskById(id: number): Promise<Task[]> {
        const oldTasks: Task[] = await this.getAllTasks();
        const newTasks = oldTasks.filter(task => task.id !== id);
        await fs.promises.truncate(TasksManager.storagePath);
        await fs.promises.writeFile(TasksManager.storagePath, JSON.stringify(newTasks), {encoding:'utf8'})
        return newTasks;
    }

    public async toggleSelectionTaskById(id: number): Promise<Task[]> {
        const oldTasks: Task[] = await this.getAllTasks();
        const selectedTask = oldTasks.find(task => task.id === id);
        selectedTask.completed = !selectedTask.completed;
        await fs.promises.truncate(TasksManager.storagePath);
        await fs.promises.writeFile(TasksManager.storagePath, JSON.stringify(oldTasks), {encoding:'utf8'})
        return oldTasks;
    }

    public async getAllMonthTasks(month: string | number): Promise<Task[]> {
        const buffer = await fs.promises.readFile(TasksManager.storagePath, {encoding: 'utf-8'});
        const tasks: Task[] = JSON.parse(buffer.toString());
        return tasks.filter(task => Number(task.date.split('.')[1]) === Number(month));
    }

    private async getAllTasks(): Promise<Task[]> {
        const buffer = await fs.promises.readFile(TasksManager.storagePath, {encoding: 'utf-8'});
        return JSON.parse(buffer.toString());
    }
}

export default new TasksManager();
