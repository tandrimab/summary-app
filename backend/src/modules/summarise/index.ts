import { Router } from "express";
import { createPrompt, filterTeamData } from "./service";

const router = Router();

router.get('/', async (req, res) => {
    console.log("In the summarise module");
    const data = await createPrompt();
    res.status(200).json({
        success: true,
        data
    });
});

export default router;