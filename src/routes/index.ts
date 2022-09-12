import { Router } from 'express';

const routes = Router();
let anuncios = [
    {id : "1", name: "Anúncio 1"},
    {id : "2", name: "Anúncio 2"},
    {id : "3", name: "Anúncio 3"},
    {id : "4", name: "Anúncio 4"},
];
routes.get('/ads', (request, response) => {
    response.json(anuncios);
});

export {
    routes
}