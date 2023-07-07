import { Card } from '../models/card.js';
import {
  NotFoundError, ForbiddenError,
} from '../utils/errors/index.js';
import { messages } from '../utils/consts.js';

export const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch(next);
};

export const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

export const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .orFail(() => {
      throw new NotFoundError(messages.card.notFound);
    })
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Удалять можно только свою карточку');
      }
      Card.findByIdAndRemove(cardId)
        .then(() => {
          res.send({ message: messages.card.deleted });
        })
        .catch(next);
    })
    .catch(next);
};

export const likeCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError(messages.card.notFound);
    })
    .then((card) => res.send(card))
    .catch(next);
};

export const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError(messages.card.notFound);
    })
    .then((card) => res.send(card))
    .catch(next);
};
