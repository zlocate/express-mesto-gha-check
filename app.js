import express from 'express';
import mongoose from 'mongoose';
import { PORT, DB_URI } from './env.config.js';
import { usersRouter } from './routes/users.js';
import { cardsRouter } from './routes/cards.js';
import { NotFoundError } from './utils/errors/index.js';
import { messages } from './utils/consts.js';

const app = express();
mongoose.connect(DB_URI);

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '649485caa20cf7be45885fd7',
  };

  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((req, res) => {
  NotFoundError
    .sendError({ res, message: messages.common.notFound });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running');
});
