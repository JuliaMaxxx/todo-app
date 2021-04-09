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
const fs_1 = __importDefault(require("fs"));
const tasks_manager_1 = __importDefault(require("../core/tasks-manager"));
exports.default = (app) => {
    app.get("/calendar", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let index;
        if (req.query.index) {
            index = Number(req.query.index);
        }
        else {
            index = 3;
        }
        const buffer = yield fs_1.default.promises.readFile(process.cwd() + '/calendar.json', { encoding: 'utf-8' });
        const months = JSON.parse(buffer.toString());
        const tasks = yield tasks_manager_1.default.getAllMonthTasks(index + 1);
        const daysWithTasks = [];
        for (let i = 0; i < months[index].days; i++) {
            if (tasks.some(task => Number(task.date.split('.')[0]) === i)) {
                daysWithTasks.push(i);
            }
        }
        res.render("calendar", { month: months[index], index, daysWithTasks });
    }));
};
//# sourceMappingURL=calendar.js.map