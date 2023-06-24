import app from './app.js';
import config from './utils/config.js';

const PORT = process.env.PORT || 8080;

app.get("/", (_req, res) => {
    res.send("Hello World");
});

app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
});