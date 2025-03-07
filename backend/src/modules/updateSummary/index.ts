import { Router } from "express";
import { createInputUpdatePrompt } from "./service";

const router = Router();

router.post('/', async (req, res) => {
    const summaryUpdate = req.body.summary;
    
    const data = await createInputUpdatePrompt(summaryUpdate);
    res.status(200).json({
        success: true,
        data
    });
});

export default router;