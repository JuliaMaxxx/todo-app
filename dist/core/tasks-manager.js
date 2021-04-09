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
class TasksManager {
    static get storagePath() {
        return process.cwd() + '/tasks.json';
    }
    getTasksByDate(date) {
        return __awaiter(this, void 0, void 0, function* () {
            const tasks = yield this.getAllTasks();
            return tasks.filter(task => task.date === date);
        });
    }
    addTask(task) {
        return __awaiter(this, void 0, void 0, function* () {
            const oldTasks = yield this.getAllTasks();
            const newTasks = oldTasks.concat(task);
            yield fs_1.default.promises.truncate(TasksManager.storagePath);
            yield fs_1.default.promises.writeFile(TasksManager.storagePath, JSON.stringify(newTasks), { encoding: 'utf8' });
            return newTasks;
        });
    }
    deleteTaskById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const oldTasks = yield this.getAllTasks();
            const newTasks = oldTasks.filter(task => task.id !== id);
            yield fs_1.default.promises.truncate(TasksManager.storagePath);
            yield fs_1.default.promises.writeFile(TasksManager.storagePath, JSON.stringify(newTasks), { encoding: 'utf8' });
            return newTasks;
        });
    }
    toggleSelectionTaskById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const oldTasks = yield this.getAllTasks();
            const selectedTask = oldTasks.find(task => task.id === id);
            selectedTask.completed = !selectedTask.completed;
            yield fs_1.default.promises.truncate(TasksManager.storagePath);
            yield fs_1.default.promises.writeFile(TasksManager.storagePath, JSON.stringify(oldTasks), { encoding: 'utf8' });
            return oldTasks;
        });
    }
    getAllMonthTasks(month) {
        return __awaiter(this, void 0, void 0, function* () {
            const buffer = yield fs_1.default.promises.readFile(TasksManager.storagePath, { encoding: 'utf-8' });
            const tasks = JSON.parse(buffer.toString());
            return tasks.filter(task => Number(task.date.split('.')[1]) === Number(month));
        });
    }
    getAllTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            const buffer = yield fs_1.default.promises.readFile(TasksManager.storagePath, { encoding: 'utf-8' });
            return JSON.parse(buffer.toString());
        });
    }
}
exports.default = new TasksManager();
//# sourceMappingURL=tasks-manager.js.map