import { GoogleGenerativeAI } from "@google/generative-ai";

import { employeeUpdates } from "../../source/data";
import { WEEKLY_PROMPT } from "./prompts";

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


const genAI = new GoogleGenerativeAI(process.env.LLM_SERVICE_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export function filterTeamData() {
    const filteredData: any = {};
    employeeUpdates.data.forEach((item) => {
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
                update: update.update?.remarks || null,
                leaves: update.leaves?.filter((leave: any) => leave.status === "APPROVED") || [],
                holiday: update.holiday || null,
            });
        }
    });
    return filteredData;
}

function appendData(prompt: string, data: string) {
    return prompt + '```\n' + data + '\n```\n';
    
}

export async function createPrompt() {
    
    try {
        const prompt = appendData(WEEKLY_PROMPT, JSON.stringify(filterTeamData()));
        console.log("prompt: ", prompt);

        const result = await model.generateContent(prompt);    
        console.log(result.response.text());
        return result.response.text();
    } catch (error) {
        console.log("Error: ", error);
        throw error;
    }
}