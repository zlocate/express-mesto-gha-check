import express from 'express';
import {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} from '../controllers/cards.js';
import { cardIdCelebrate, createCardCelebrate } from '../models/card.js';

const router = express.Router();

router.get('/', getCards);
router.post('/', createCardCelebrate, createCard);
router.delete('/:cardId', cardIdCelebrate, deleteCard);
router.put('/:cardId/likes', cardIdCelebrate, likeCard);
router.delete('/:cardId/likes', cardIdCelebrate, dislikeCard);

export {
  router as cardsRouter,
};
