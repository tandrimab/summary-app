"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const service_1 = require("./service");
const router = (0, express_1.Router)();
router.get('/hello', (req, res) => {
    res.status(200).send({ success: true, message: (0, service_1.testHello)() });
});
exports.default = router;
