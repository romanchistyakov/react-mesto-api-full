const Card = require('../models/cards');
const WrongDataError = require('../errors/WrongDataError');
const NotFoundError = require('../errors/NotFoundError');
const NotAuthorizedCardError = require('../errors/NotAuthorizedCardError');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  Card.create({ name, link, owner: _id })
    .then((card) => res.send({ data: card }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new WrongDataError('Переданы некорректные данные при создании карточки.'));
      } else {
        next(error);
      }
    });
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((error) => next(error));
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .orFail(() => { throw new NotFoundError('Карточка по указанному _id не найдена.'); })
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new NotAuthorizedCardError('Карточка принадлежит другому пользователю.');
      }
      Card.findByIdAndDelete(cardId)
        .then(() => res.send({ data: card }));
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new WrongDataError('Передан некорректный _id карточки'));
      } else {
        next(error);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(() => { throw new NotFoundError('Карточка по указанному _id не найдена.'); })
    .then((card) => res.send({ data: card }))
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new WrongDataError('Передан некорректный _id карточки'));
      } else {
        next(error);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => { throw new NotFoundError('Карточка по указанному _id не найдена.'); })
    .then((card) => res.send({ data: card }))
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new WrongDataError('Передан некорректный _id карточки'));
      } else {
        next(error);
      }
    });
};
