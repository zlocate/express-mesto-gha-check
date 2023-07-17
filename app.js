import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import { PORT, DB_URI } from './env.config.js';
import { usersRouter } from './routes/users.js';
import { cardsRouter } from './routes/cards.js';
import { NotFoundError } from './utils/errors/index.js';
import { messages } from './utils/consts.js';
import { createUser, login } from './controllers/users.js';
import { authMiddleware } from './middlewares/auth.js';
import { errorsMiddleware } from './middlewares/errors.js';
import { signinCelebrate, signupCelebrate } from './validators/users.js';

const app = express();
// Дублирование дефолтного значения иначе автотесты не проходят
mongoose.connect(DB_URI ?? 'mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());
app.use(cookieParser());

app.post('/signup', signupCelebrate, createUser);
app.post('/signin', signinCelebrate, login);

app.use('/users', authMiddleware, usersRouter);
app.use('/cards', authMiddleware, cardsRouter);
app.use((req, res, next) => {
  next(new NotFoundError(messages.common.notFound));
});

app.use(errors());
app.use(errorsMiddleware);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running');
});
