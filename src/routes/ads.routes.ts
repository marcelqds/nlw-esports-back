import { Router, Response, Request } from 'express';
import { PrismaClient } from '@prisma/client';

let adsRouter = Router();
const prisma = new PrismaClient();

adsRouter.post('/', (request: Request, response: Response) => {

    return response.status(201).json([]);
});

adsRouter.get('/:id/discord', async (request: Request, response: Response) => {
    const { id } = request.params;
    const ads = await prisma.ad.findFirst({ where: {id}});    
    if(!ads)return response.status(404).json({message: "Não foi encontrado anúncio com essa id"});    
    return response.json({ discord: ads.discord });
});

export { adsRouter }