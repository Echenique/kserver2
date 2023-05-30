import {Router} from 'express';
import * as Controllers from './Controllers'
import httpMiddleware from './utils/httpMiddleware';

const routes = Router();

// Users
routes.post('/services/user/sigin', Controllers.UserController.signin);
routes.post('/services/user/register', Controllers.UserController.registerUser);
routes.get('/services/users', httpMiddleware.checkAuth, Controllers.UserController.getUsers);
routes.get('/services/user/check-auth', httpMiddleware.checkAuth, Controllers.UserController.checkAuth);

routes.get('/services/hotels', httpMiddleware.checkAuth, Controllers.HotelController.getHotels);

export default routes;