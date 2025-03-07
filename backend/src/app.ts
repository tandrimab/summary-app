import express, { Request, Response, NextFunction } from "express";
import { json as bodyParserJson } from "body-parser";
import cors from "cors";

import summaryRoute from "./modules/summarise";
import updateSummaryRoute from "./modules/updateSummary"


const app = express();

app.use(bodyParserJson());

const allowedOrigins: string[] = JSON.parse(process.env.ALLOWED_ORIGINS ||
    '["http://localhost:3000"]');

const corsOptions: cors.CorsOptions = {
    origin: function (origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

app.use(cors(corsOptions));

app.use('/summarise', summaryRoute);
app.use('/updateSummary', updateSummaryRoute)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log("error:", err)
    res.status(500).json({ error: err.message });
});

export default app;