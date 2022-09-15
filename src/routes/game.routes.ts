import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { converterMinutesToHourString, converterHourStringToMinutes } from '../utils';

let gameRouter = Router();
const prisma = new PrismaClient();

gameRouter.get('/', async (request: Request, response: Response) =>{
    const games = await prisma.game.findMany({
        include:{
            _count:{
                select:{
                    Ad:true
                }
            }
        }
    });
    return response.json(games);
});

gameRouter.get('/:id/ads', async (request: Request, response: Response) =>{
    const { id } = request.params;
    
    const game = await prisma.game.findFirst({ where:{ id }});
    if(!game) return response.status(404).json({message: "Esse game não existe"});
    
    const ads = await prisma.ad.findMany({ 
        select:{
            id: true,
            name: true,
            yearsPlaying: true,
            weekDays: true,
            hoursStart: true,
            hoursEnd: true,
            useVoiceChannel: true
        },
        where: { gameId: id },
        orderBy:{createdAt: "desc"}
    });
    let retAds = ads.map(ad => {
        return {
            ...ad,
            hoursStart: converterMinutesToHourString(ad.hoursStart),
            hoursEnd : converterMinutesToHourString(ad.hoursEnd),
            weekDays: ad.weekDays.split(",")
        }
    });

    return response.json(retAds);
    
});

gameRouter.post('/', async (request: Request, response: Response) =>{
    const { title, bannerUrl } = request.body;
    if(!(title && bannerUrl)) return response.status(400).json({message: "Informe valores válidos"});
    return response.status(201).json({title, bannerUrl});

    const data = {title, bannerUrl};
    const games = await prisma.game.create({ data });
    return response.status(201).json(games);
});

gameRouter.post('/:id/ads', async (request: Request, response: Response) => {
    let { id } = request.params;
    const game = await prisma.game.findUniqueOrThrow({where: { id }});

    let {
        name, yearsPlaying, discord, weekDays,
        hoursStart, hoursEnd, useVoiceChannel 
    } = request.body;
    const tmpWeekDays = weekDays.join(',');
    const tmpHoursStart = converterHourStringToMinutes(hoursStart);
    const tmpHoursEnd = converterHourStringToMinutes(hoursEnd);    
    useVoiceChannel = useVoiceChannel || false;

    if(
        !(
            name 
            && yearsPlaying && discord 
            && tmpWeekDays && tmpHoursStart >= 0 && tmpHoursEnd >= 0
        )
    ) return response.status(400).json({ message : "Informe campos válidos"});
    
    const data = {
        gameId: id, name, yearsPlaying, discord, weekDays,
        hoursStart: tmpHoursStart, hoursEnd: tmpHoursEnd, useVoiceChannel
    }
    
    console.info(data);

    const ad = await prisma.ad.create({ data });
    return response.status(201).json(ad);
});

export{ gameRouter }