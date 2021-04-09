import express, {Application} from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import {
    addTaskRoute,
    rootRoute,
    calendarRoute
} from "./routes";


dotenv.config();

const app: Application = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(process.cwd() + '/views'));

rootRoute(app);
addTaskRoute(app);
calendarRoute(app);

const port = process.env.PORT;

app.listen(port, () => console.log(`Server runs on ${port} port`));

