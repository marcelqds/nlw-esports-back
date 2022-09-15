import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

let gameRouter = Router();
const prisma = new PrismaClient();

gameRouter.get('/', async (request: Request, response: Response) =>{
    const games = await prisma.game.findMany();
    return response.json(games);
});

gameRouter.get('/:id/ads', async (request: Request, response: Response) =>{
    const { id } = request.params;
    
    const game = await prisma.game.findFirst({ where:{ id }});
    if(!game) return response.status(404).json({message: "Esse game não existe"});
    
    const ads = await prisma.ad.findMany({ where: { gameId: id}});
    return response.json(ads);
    
});

gameRouter.post('/', async (request: Request, response: Response) =>{
    const { title, bannerUrl } = request.body;
    if(!(title && bannerUrl)) return response.status(400).json({message: "Informe valores válidos"});
    
    const data = {title, bannerUrl};
    const games = await prisma.game.create({ data });
    return response.status(201).json(games);
});

export{ gameRouter }