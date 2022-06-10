# GoIT Node.js Homework

http://localhost:3000/api/

Method - Endpoint - Operation - Required Data

### AUTHORIZATION

POST /auth/signup - register/signup (body - {email, password,
subscription:starter/pro/business})

POST /auth/login - Login (body - {email, password})

GET /auth/logout - Logout

### CONTACT LIST

Сделана пагинация для коллекции контактов (GET /contacts?page=1&limit=20).
Сделана фильтрация контактов по полю избранного (GET /contacts?favorite=true)

GET /contacts - get all contacts (Pagination URL - page = 2, limit = 4)

GET /contacts/:contactId - get 1 contact (id)

POST /contacts - add new contact (name, email ,phone, [favorite])

DELETE /contacts/:contactId - delete contact (id)

PUT /contacts/:contactId - update contact (id)

PATCH /contacts/:contactId/favorite - update status "favorite" (body -
{favorite:true/false})

### USER

GET /users/current - Get current user

62a352c61b9683bb8f084161

### Команды:

- `npm start` &mdash; старт сервера в режиме production
- `npm run start:dev` &mdash; старт сервера в режиме разработки (development)
- `npm run lint` &mdash; запустить выполнение проверки кода с eslint, необходимо
  выполнять перед каждым PR и исправлять все ошибки линтера
- `npm lint:fix` &mdash; та же проверка линтера, но с автоматическими
  исправлениями простых ошибок
