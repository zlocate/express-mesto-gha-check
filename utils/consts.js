export const messages = {
  common: {
    badId: 'Передан некорректный _id',
    notFound: 'По указанному пути ничего не найдено',
    serverError: 'На сервере произошла ошибка',
    authorized: 'Вы успешно авторизавались',
  },
  user: {
    notFound: 'Пользователь не найден',
    createBadData: 'Переданы некорректные данные при создании пользователя',
    updateBadData: 'Переданы некорректные данные при обновлении профиля',
    updateWrongFields: 'Переданы некорректные поля для обновления пользователя',
    loginBadData: 'Передан неверный логин или пароль',
    conflictEmail: 'Пользователь с указанным email уже существует',
  },
  card: {
    notFound: 'Карточка с указанным _id не найдена',
    badData: 'Переданы некорректные данные при создании карточки',
    deleted: 'Карточка успешно удалена',
  },
};

export const statuses = {
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
  default: 500,
};
