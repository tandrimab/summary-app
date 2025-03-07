"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const cors_1 = __importDefault(require("cors"));
const summarise_1 = __importDefault(require("./modules/summarise"));
const updateSummary_1 = __importDefault(require("./modules/updateSummary"));
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
const allowedOrigins = JSON.parse(process.env.ALLOWED_ORIGINS ||
    '["http://localhost:3000"]');
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};
app.use((0, cors_1.default)(corsOptions));
app.use('/summarise', summarise_1.default);
app.use('/updateSummary', updateSummary_1.default);
app.use((err, req, res, next) => {
    console.log("error:", err);
    res.status(500).json({ error: err.message });
});
exports.default = app;
