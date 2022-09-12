import express from 'express';
import '../.env';
import { routes } from './routes';
const port = process.env.PORT || "3300";

const app = express();
app.use(routes);

app.listen(port , () => {
    console.log(`Server start in port ${port}`);
});
