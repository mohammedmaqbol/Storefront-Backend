import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import config from './config';
import routes from './routes/route';

const app = express();
const port = config.port || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (_req: Request, res: Response) => {
  res.send('STOREFRONT-API 🟡');
});
app.use(routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;
