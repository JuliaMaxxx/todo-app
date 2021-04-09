import {Application} from "express";
import taskManager from '../core/tasks-manager';
// @ts-ignore
import dateTime from "date-and-time";
import {Task} from "../models";

export default (app: Application) => {
    app.get("/add-task", (req, res) => {
        res.render("add-task");
    });

    app.post("/add-task", async (req, res) => {
        const { title, description, date, color } = req.body;
        const task: Task = {
            id: Date.now(),
            title,
            description,
            date: dateTime.transform(date, 'YYYY-MM-DD', 'DD.MM.YYYY'),
            color,
            completed: false
        }
        await taskManager.addTask(task);
        res.redirect('/main');
    })
}
