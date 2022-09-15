import { Router, Response, Request } from 'express';
import { PrismaClient } from '@prisma/client';

let adsRouter = Router();
const prisma = new PrismaClient();

adsRouter.post('/', async (request: Request, response: Response) => {
    let {
        gameId, name, yearsPlaying, discord, weekDays,
        hoursStart, hoursEnd, useVoiceChannel 
    } = request.body;

    const tmpHoursStart = parseInt(hoursStart);
    const tmpHoursEnd = parseInt(hoursEnd);    
    useVoiceChannel = useVoiceChannel || false;

    if(
        !(
            gameId && name 
            && yearsPlaying && discord 
            && weekDays && tmpHoursStart >= 0 && tmpHoursEnd >= 0
        )
    ) return response.status(400).json({ message : "Informe campos válidos"});
    
    const data = {
        gameId, name, yearsPlaying, discord, weekDays,
        hoursStart: tmpHoursStart, hoursEnd: tmpHoursEnd, useVoiceChannel
    }
    
    console.info(data);

    const game = await prisma.ad.create({ data });
    return response.status(201).json(game);
});

adsRouter.get('/:id/discord', async (request: Request, response: Response) => {
    const { id } = request.params;
    const ads = await prisma.ad.findFirst({ 
        select:{
            discord: true
        },
        where: { id }
    });
    if(!ads)return response.status(404).json({message: "Não foi encontrado anúncio com essa id"});    
    
    return response.json(ads);
});

export { adsRouter }