/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  //rota que testa se a api foi inicializada corretamente
  Route.get('/', async () => {
    return { hello: 'world' }
  })

  //rota que realiza login de usuário
  Route.post('login', 'AuthController.login')

  //rota que cadastra um usuário como aluno
  Route.resource('/aluno', 'AlunosController').apiOnly()

  //rota que cadastra um usuário como professor
  Route.resource('/professor', 'ProfessoresController').apiOnly()
}).prefix('/api')
