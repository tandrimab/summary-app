"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INPUT_PROMPTS = void 0;
exports.INPUT_PROMPTS = `
I have a data in text format that consists of updates from team members for the past week. It might have bullet points describing updates. The first sentence contains name followed by updates of each person.


I'm looking for a concise team summary in 400 words where we can highlight what the team has achieved in the given week. The achievements, the backlogs, issues, blockers and work related stuff are important. It should also mention leaves (half or full day), holidays as well.
Group it as achievements and work as a team, leave and holiday information, backlogs and issues.

Consider these points:
- Do not share advice.
- Do not point out fingers at anyone.
- Keep the summary neutral and team-oriented without including appraisals. We only want summary of activities to understand progress.
- Return the response with enbedded HTML not mermaid and wrap the names in <b></b> also add a new line after each paragraph. Each subsection shold be bold with header 3
- Send it without using code block starting with backtick html
- After Each employee's update, add a new line

Please find the input text below. \n
`;
