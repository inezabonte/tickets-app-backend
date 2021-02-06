import express from 'express'
import cors from 'cors';
import 'dotenv/config';
import routes from './routes/index';
import ApplicationError from './utils/errors/applicationError';


const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/', routes);

app.all('*', (req, res, next) => {
    const err = new ApplicationError('Page Requested not found', 404);
    next(err);
});

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({ status: statusCode, error: err.message, stack: err.stack });
  next(err);
});

app.listen(port, () => {
  console.log(`CORS-enabled web server listening on port ${port}  ...`);
}).on('error', (err) => {
  if (err.errno === 'EADDRINUSE') {
    console.log(`----- Port ${port} is busy, trying with port ${port + 1} -----`);
    app.listen(port + 1);
  } else {
    console.log(err);
  }
});