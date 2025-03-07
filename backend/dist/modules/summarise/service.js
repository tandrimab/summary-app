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
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterTeamData = filterTeamData;
exports.createPrompt = createPrompt;
const generative_ai_1 = require("@google/generative-ai");
const data_1 = require("../../source/data");
const prompts_1 = require("./prompts");
const utils_1 = require("../../utils");
const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.LLM_SERVICE_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
function filterTeamData() {
    const filteredData = {};
    data_1.employeeUpdates.data.forEach((item) => {
        var _a, _b;
        if (!filteredData[item.date]) {
            filteredData[item.date] = [];
        }
        for (const update of item.updates) {
            filteredData[item.date].push({
                employee: {
                    employeeId: update.employee.employeeId,
                    name: update.employee.name,
                    location: update.employee.location,
                    gender: update.employee.gender,
                },
                update: ((_a = update.update) === null || _a === void 0 ? void 0 : _a.remarks) || null,
                leaves: ((_b = update.leaves) === null || _b === void 0 ? void 0 : _b.filter((leave) => leave.status === "APPROVED")) || [],
                holiday: update.holiday || null,
            });
        }
    });
    return filteredData;
}
function createPrompt() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const prompt = (0, utils_1.appendData)(prompts_1.WEEKLY_PROMPT, JSON.stringify(filterTeamData()));
            console.log("prompt: ", prompt);
            const result = yield model.generateContent(prompt);
            console.log(result.response.text());
            return result.response.text();
        }
        catch (error) {
            console.log("Error: ", error);
            throw error;
        }
    });
}
