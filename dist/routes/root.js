"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const date_and_time_1 = __importDefault(require("date-and-time"));
const tasks_manager_1 = __importDefault(require("../core/tasks-manager"));
const fs_1 = __importDefault(require("fs"));
exports.default = (app) => {
    app.use("/main", (req, res, next) => {
        let { month, day } = req.query;
        if (!month || !day) {
            const today = date_and_time_1.default.format(new Date(), 'D.M.YYYY').split('.');
            req.query.month = (Number(today[1]) - 1).toString();
            req.query.day = today[0];
            day = today[0];
            month = (Number(today[1]) - 1).toString();
        }
        const monthNumber = Number(month) + 1;
        req.query.date = date_and_time_1.default
            .transform(day + '.' + monthNumber + '.' + 2021, 'D.M.YYYY', 'DD.MM.YYYY');
        next();
    });
    app.get("/main", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let { month, day, date } = req.query;
        const buffer = yield fs_1.default.promises.readFile(process.cwd() + '/calendar.json', { encoding: 'utf-8' });
        const months = JSON.parse(buffer.toString());
        const renderParameters = yield getRenderParameters(date, months[Number(month)].name + ', ' + day, month, day);
        res.render("main", renderParameters);
    }));
    app.post("/main", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const body = req.body;
        const action = Object.keys(body)[0];
        if (action === 'select') {
            yield tasks_manager_1.default.toggleSelectionTaskById(Number(body[action]));
        }
        else {
            yield tasks_manager_1.default.deleteTaskById(Number(body[action]));
        }
        let { month, day, date } = req.query;
        const buffer = yield fs_1.default.promises.readFile(process.cwd() + '/calendar.json', { encoding: 'utf-8' });
        const months = JSON.parse(buffer.toString());
        const renderParameters = yield getRenderParameters(date, months[Number(month)].name + ', ' + day, month, day);
        res.render("main", renderParameters);
    }));
};
function getRenderParameters(date, caption, month, day) {
    return __awaiter(this, void 0, void 0, function* () {
        const tasks = yield tasks_manager_1.default.getTasksByDate(date);
        const completedTasksNumber = tasks.filter(task => task.completed).length;
        const progressBarLength = 100;
        const progressBarValue = progressBarLength * completedTasksNumber / tasks.length;
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
    });
}
//# sourceMappingURL=root.js.map