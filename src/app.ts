import express, { Application, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import compression from 'compression';
import mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import router from './routes/index';

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': true }));
app.use(compression());
app.use(morgan('dev'));
app.use('/', router);

app.get('/', (req: Request, res: Response): object => {
  return res.json({ status: 'success', message: 'Welcome to the api' });
});

app.use((req: Request, res: Response, next: NextFunction): void => {
  res.status(404).json({ message: 'page not found' })
  next();
});

app.use((error: { message: string; status: number }, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500);
  res.json({
    status: 'error',
    message: error.message
  });
  next();
});

const PORT: any = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/ts-mongo', { useNewUrlParser: true }, (err: Error) => {
  if (err) console.log(err.message);
});

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
