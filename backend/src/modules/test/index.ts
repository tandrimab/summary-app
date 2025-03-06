import { Router } from "express";
import { testHello } from "./service";

const router = Router();

router.get('/hello', (req, res) => {
    res.status(200).send({ success: true, message: testHello() });
});

export default router;