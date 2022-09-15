# nlw-esports-back
```bash
```
## Tecnologias / libs
- [x] express
```bash
    npm install express
    npm install -D @types/express
```
- [x] typescript
```bash
    npm install -D typescript
```
- [x] typescript
```bash
    npm install -D ts-node-dev
```
- [x] prisma
```bash
   npm install -D prisma
```
- [x] prisma/client
```bash
   npm install @prisma/client
```
- [x] cors
```bash
   npm install cors
   npm install -D @types/cors
```

## Entidades

### Game
- id
- title
- bannerUrl

### Ad
- id
- gamerId
- name
- yearsPlaying
- discord
- weekDays
- hoursStart
- hoursEnd
- useVoiceChannel
- createdAt

## Caso de uso
- Listagem de gamers com contagem de anúncios
- Criação de novo anúncio
- Listagem de anúncios por game
- Buscar discord pelo `id` do anúncio

<!-- npx prisma studio 
npx prisma migrate diff | dev -->

