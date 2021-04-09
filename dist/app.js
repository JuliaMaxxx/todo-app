"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = require("./routes");
dotenv_1.default.config();
const app = express_1.default();
app.set("view engine", "ejs");
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(process.cwd() + '/views'));
routes_1.rootRoute(app);
routes_1.addTaskRoute(app);
routes_1.calendarRoute(app);
const port = process.env.PORT;
app.listen(port, () => console.log(`Server runs on ${port} port`));
//# sourceMappingURL=app.js.map