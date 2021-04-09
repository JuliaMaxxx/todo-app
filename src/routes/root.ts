import {Application} from "express";
// @ts-ignore
import dateTime from 'date-and-time';
import tasksManager from '../core/tasks-manager';
import {Task} from "../models";
import fs from "fs";

interface RenderParameters {
    tasks: Task[];
    progressBar: {
        progressBarLength: number;
        progressBarValue: number;
    };
    tasksNumber: {
        completedTasksNumber: number;
        allTasksNumber: number;
    },
    caption: string,
    month: string,
    day: string
}

export default (app: Application) => {

    app.use("/main", (req, res, next) => {
        let { month, day } = req.query;
        if (!month || !day) {
            const today = dateTime.format(new Date(), 'D.M.YYYY').split('.');
            req.query.month = (Number(today[1]) - 1).toString();
            req.query.day = today[0];
            day = today[0];
            month = (Number(today[1]) - 1).toString();
        }
        const monthNumber = Number(month) + 1;
        req.query.date = dateTime
            .transform(day + '.' + monthNumber + '.' + 2021, 'D.M.YYYY', 'DD.MM.YYYY');
        next();
    })

    app.get("/main", async (req, res) => {
        let { month, day, date } = req.query;
        const buffer = await fs.promises.readFile(process.cwd() + '/calendar.json', {encoding: 'utf-8'});
        const months = JSON.parse(buffer.toString());
        const renderParameters = await getRenderParameters(
            date as string,
            months[Number(month)].name + ', ' + day,
            month as string,
            day as string
        );
        res.render("main", renderParameters);
    });

    app.post("/main", async (req, res) => {
        const body = req.body;
        const action: string = Object.keys(body)[0];

        if (action === 'select') {
           await tasksManager.toggleSelectionTaskById(Number(body[action]));
        } else {
            await tasksManager.deleteTaskById(Number(body[action]));
        }

        let { month, day, date } = req.query;
        const buffer = await fs.promises.readFile(process.cwd() + '/calendar.json', {encoding: 'utf-8'});
        const months = JSON.parse(buffer.toString());
        const renderParameters = await getRenderParameters(
            date as string,
            months[Number(month)].name + ', ' + day,
            month as string,
            day as string
        );
        res.render("main", renderParameters);
    });
}

async function getRenderParameters(date: string, caption: string, month: string, day: string): Promise<RenderParameters> {
    const tasks = await tasksManager.getTasksByDate(date);
    const completedTasksNumber = tasks.filter(task => task.completed).length;
    const progressBarLength = 100;
    const progressBarValue = progressBarLength * completedTasksNumber / tasks.length ;
    return {
        tasks,
        progressBar: {
            progressBarLength,
            progressBarValue
        },
        tasksNumber: {
            completedTasksNumber,
            allTasksNumber: tasks.length
        },
        caption,
        month,
        day
    };
}
