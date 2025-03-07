import 'dotenv/config';

import logger from "./logger";
logger.info("Winston logging initialized!");

import app from "./app";

init();

async function init() {
    const PORT = process.env.PORT || 3001;
    try {
        app.listen(PORT, () => {
            console.log(`Summary app listening on port ${PORT}`);
        });
    } catch (error) {
        console.error(`An error occurred ${JSON.stringify(error)}`);
        process.exit(1);
    }
}