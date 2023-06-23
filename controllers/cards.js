import { Card } from '../models/card.js';
import { NotFoundError, handleDefaultError, BadRequestError } from '../utils/errors/index.js';
import { messages } from '../utils/consts.js';

export const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        BadRequestError
          .sendError({ res, message: messages.card.badData });
        return;
      }
      handleDefaultError({ res, error });
    });
};

export const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((error) => handleDefaultError({ res, error }));
};

export const deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .orFail(() => {
      throw new NotFoundError();
    })
    .then(() => {
      res.send({ message: messages.card.deleted });
    })
    .catch((error) => {
      if (error instanceof NotFoundError) {
        NotFoundError
          .sendError({ res, message: messages.card.notFound });
        return;
      }

      if (error.name === 'CastError') {
        BadRequestError
          .sendError({ res, message: messages.common.badId });
        return;
      }

      handleDefaultError({ res, error });
    });
};

export const likeCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((card) => res.send(card))
    .catch((error) => {
      if (error instanceof NotFoundError) {
        NotFoundError
          .sendError({ res, message: messages.card.notFound });
        return;
      }

      if (error.name === 'CastError') {
        BadRequestError
          .sendError({ res, message: messages.common.badId });
        return;
      }

      handleDefaultError({ res, error });
    });
};

export const dislikeCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((card) => res.send(card))
    .catch((error) => {
      if (error instanceof NotFoundError) {
        NotFoundError
          .sendError({ res, message: messages.card.notFound });
        return;
      }

      if (error.name === 'CastError') {
        BadRequestError
          .sendError({ res, message: messages.common.badId });
        return;
      }

      handleDefaultError({ res, error });
    });
};
