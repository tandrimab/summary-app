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
exports.filterTeamData = filterTeamData;
exports.createPrompt = createPrompt;
const data_1 = require("../../source/data");
const llamaai_1 = __importDefault(require("llamaai"));
const prompts_1 = require("./prompts");
const apiToken = process.env.LLM_SERVICE_API_KEY || "";
const llamaAPI = new llamaai_1.default(apiToken);
// type EmployeeUpdates = {
//     data: {
//         date: string;
//         occassion: any;
//         updates: ({
//             employee: {
//                 id: number;
//                 name: string;
//                 employeeId: string;
//                 email: string;
//                 joiningDate: string;
//                 designation: string;
//                 location: string;
//                 timezone: string;
//                 ... 15 more ...;
//                 techStack: string;
//             };
//             ... 5 more ...;
//             exempted: boolean;
//         } | {
//             ...;
//         })[];
//         releaseNotes: any[];
//         meeting: any[];
//     }[];
// };
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
function appendData(prompt, data) {
    return prompt + '```\n' + data + '\n```\n';
}
function createPrompt() {
    return __awaiter(this, void 0, void 0, function* () {
        // const LlamaAI = await import('llamaai');
        // const llamaAPI = new LlamaAI(apiToken);
        const prompt = prompts_1.WEEKLY_PROMPT;
        const apiRequestJson = {
            messages: [{ role: "user", content: appendData(prompt, JSON.stringify(filterTeamData())) }],
        };
        llamaAPI
            .run(apiRequestJson)
            .then((response) => {
            // Process response
            return response;
        })
            .catch((error) => {
            // Handle errors
            return error;
        });
    });
}
