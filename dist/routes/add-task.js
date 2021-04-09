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
const tasks_manager_1 = __importDefault(require("../core/tasks-manager"));
// @ts-ignore
const date_and_time_1 = __importDefault(require("date-and-time"));
exports.default = (app) => {
    app.get("/add-task", (req, res) => {
        res.render("add-task");
    });
    app.post("/add-task", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { title, description, date, color } = req.body;
        const task = {
            id: Date.now(),
            title,
            description,
            date: date_and_time_1.default.transform(date, 'YYYY-MM-DD', 'DD.MM.YYYY'),
            color,
            completed: false
        };
        yield tasks_manager_1.default.addTask(task);
        res.redirect('/main');
    }));
};
//# sourceMappingURL=add-task.js.map