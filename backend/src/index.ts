import 'dotenv/config';

import app from "./app";

const PORT = process.env.PORT || 3001;

init();

async function init() {
    try {
        app.listen(PORT, () => {
            console.log(`Summary app listening on port ${PORT}`);
        });
    } catch (error) {
        console.error(`An error occurred ${JSON.stringify(error)}`);
        process.exit(1);
    }
}