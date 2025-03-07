import { GoogleGenerativeAI } from "@google/generative-ai";
import { INPUT_PROMPTS } from "./prompts";


const genAI = new GoogleGenerativeAI(process.env.LLM_SERVICE_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


export async function createInputUpdatePrompt(weeklyPrompt: string) {
    try {
        const result = await model.generateContent(INPUT_PROMPTS + weeklyPrompt);    
        console.log(result.response.text());
        return result.response.text();
    } catch (error) {
        console.log("Error: ", error);
        throw error;
    }
}