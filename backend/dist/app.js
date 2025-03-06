"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const summarise_1 = __importDefault(require("./modules/summarise"));
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
/* redirect to modules */
app.use('/summarise', summarise_1.default);
exports.default = app;
