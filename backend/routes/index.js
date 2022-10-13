const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const users = require('./users');
const cards = require('./cards');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const url = require('../utils/url');
const NotFoundError = require('../errors/NotFoundError');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(url),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

router.use(auth);

router.use('/users', users);
router.use('/cards', cards);
router.use('/', (req, res, next) => next(new NotFoundError('Страница не найдена!')));

module.exports = router;
