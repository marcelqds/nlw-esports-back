import express from 'express';
import '../.env';
import cors from 'cors';

import { routes } from './routes';

const port = process.env.PORT || "3300";

const app = express();
app.use(cors({origin: ['*']}));
app.use(express.json());
app.use(routes);

app.listen(port , () => {
    console.log(`Server start in port ${ port }`);
});