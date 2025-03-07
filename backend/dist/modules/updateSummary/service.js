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
exports.createInputUpdatePrompt = createInputUpdatePrompt;
const generative_ai_1 = require("@google/generative-ai");
const prompts_1 = require("./prompts");
const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.LLM_SERVICE_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
function createInputUpdatePrompt(weeklyPrompt) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield model.generateContent(prompts_1.INPUT_PROMPTS + weeklyPrompt);
            console.log(result.response.text());
            return result.response.text();
        }
        catch (error) {
            console.log("Error: ", error);
            throw error;
        }
    });
}
