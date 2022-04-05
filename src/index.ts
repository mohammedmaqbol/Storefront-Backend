import express from 'express';
const app = express();
import config from './config';
import db from './database';
const port = config.port || 3000;
console.log(config);

app.get('/', (req, res) => {
        res.send('Hello world..🌏');
});

db.connect().then((client) => {
        return client
                .query('SELECT NOW()')
                .then((res) => {
                        client.release();
                        console.log(res.rows);
                })
                .catch((err) => {
                        client.release();
                        console.log(err.stack);
                });
});
app.listen(port, () => {
        console.log(`server is running on port ${port}`);
});

export default app;
