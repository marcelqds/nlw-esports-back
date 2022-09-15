import express, { Router } from 'express';
import { adsRouter } from './ads.routes';
import { gameRouter } from './game.routes';

const routes = Router();

routes.use('/ads', adsRouter);
routes.use('/game', gameRouter);

export { routes }