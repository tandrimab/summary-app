import express from "express";
import { json as bodyParserJson } from "body-parser";

import summaryRoute from "./modules/summarise";

const app = express();
app.use(bodyParserJson());

/* redirect to modules */
app.use('/summarise', summaryRoute);

export default app;