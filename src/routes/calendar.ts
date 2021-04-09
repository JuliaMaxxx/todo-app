import {Application} from "express";
import fs from "fs";
import tasksManager from '../core/tasks-manager';

export default (app: Application) => {
    app.get("/calendar", async (req, res) => {
        let index: number;
        if (req.query.index) {
            index = Number(req.query.index);
        } else {
            index = 3;
        }

        const buffer = await fs.promises.readFile(process.cwd() + '/calendar.json', {encoding: 'utf-8'});
        const months = JSON.parse(buffer.toString());

        const tasks = await tasksManager.getAllMonthTasks(index + 1);
        const daysWithTasks = [];
        for (let i = 0; i < months[index].days; i++) {
            if (tasks.some(task => Number(task.date.split('.')[0]) === i)) {
                daysWithTasks.push(i);
            }
        }

        res.render("calendar", { month: months[index], index, daysWithTasks });
    });
}
