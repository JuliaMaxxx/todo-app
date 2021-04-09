"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootRoute = exports.calendarRoute = exports.addTaskRoute = void 0;
var add_task_1 = require("./add-task");
Object.defineProperty(exports, "addTaskRoute", { enumerable: true, get: function () { return __importDefault(add_task_1).default; } });
var calendar_1 = require("./calendar");
Object.defineProperty(exports, "calendarRoute", { enumerable: true, get: function () { return __importDefault(calendar_1).default; } });
var root_1 = require("./root");
Object.defineProperty(exports, "rootRoute", { enumerable: true, get: function () { return __importDefault(root_1).default; } });
//# sourceMappingURL=index.js.map