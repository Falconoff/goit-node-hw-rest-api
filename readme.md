# GoIT Node.js Homework-06

[задание](https://github.com/goitacademy/nodejs-homework/tree/master/homework-06)

---

## Endpoints

**http://localhost:3000/api/** - path

#### Authorization

| Method | Endpoint     | Operation       | Required Data                                               |
| ------ | ------------ | --------------- | ----------------------------------------------------------- |
| POST   | /auth/signup | register/signup | Body - {email, password, subscription:starter/pro/business} |
| POST   | /auth/login  | Login           | Body - {email, password}                                    |
| GET    | /auth/logout | Logout          | token                                                       |

#### Contact list

| Method | Endpoint                      | Operation                | Required Data                             |
| ------ | ----------------------------- | ------------------------ | ----------------------------------------- |
| GET    | /contacts                     | get all contacts         | (Pagination: URL - page = 2, limit = 4)   |
| GET    | /contacts/:contactId          | get 1 contact            | (URL - contactId)                         |
| POST   | /contacts                     | add new contact          | Body - {name, email ,phone, \[favorite\]} |
| DELETE | /contacts/:contactId          | delete contact           | (URL - contactId)                         |
| PUT    | /contacts/:contactId          | update contact           | (URL - contactId)                         |
| PATCH  | /contacts/:contactId/favorite | update status "favorite" | Body - {favorite:true/false}              |

#### Users

| Method | Endpoint                         | Operation                  | Required Data                              |
| ------ | -------------------------------- | -------------------------- | ------------------------------------------ |
| GET    | /users/current                   | Get current user           | token                                      |
| GET    | /users/verify/:verificationToken | Verify registered user     | verificationToken                          |
| POST   | /users/verify                    | Resend verification letter | Body - email                               |
| PATCH  | /users                           | Update Subscription status | Body - {subscription:starter/pro/business} |
| PATCH  | /users/avatars                   | Update Avatar              | Body - image file                          |

---

### Команды:

- `npm start` &mdash; старт сервера в режиме production
- `npm run start:dev` &mdash; старт сервера в режиме разработки (development)
- `npm run lint` &mdash; запустить выполнение проверки кода с eslint, необходимо
  выполнять перед каждым PR и исправлять все ошибки линтера
- `npm lint:fix` &mdash; та же проверка линтера, но с автоматическими
  исправлениями простых ошибок

---

### Заметки:

Дополнительное задание Homework-04 выполнено:

- Сделана пагинация для коллекции контактов (GET /contacts?page=1&limit=20).
- Сделана фильтрация контактов по полю избранного (GET /contacts?favorite=true).
- Сделано обновление подписки (subscription) пользователя (PATCH /users),
  которая принимает одно из следующих значений ['starter', 'pro', 'business'].

---

[temp-mail](https://temp-mail.org/ru/) Временная почта - позволяет принимать
электронные письма на временный одноразовый email, который самоуничтожается
через определенное время. Сервис также известен как “анонимная почта” или “почта
на 10 минут”.
