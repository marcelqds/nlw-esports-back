
port=3200
base_url=http://localhost:$port

get(){
    line $2
    time curl $1
    line
}

post(){
     curl -H 'Content-Type: application/json' -d "$2" -X POST $1
}

createGame(){
    line "Create Game"
    time curl -H 'Content-Type: application/json' -d '{"title": "League of Legends", "bannerUrl": "https://static-cdn.jtvnw.net/ttv-boxart/21779-188x250.jpg" }' -X POST $base_url/game
    time curl -H 'Content-Type: application/json' -d '{"title": "Valorant", "bannerUrl": "https://static-cdn.jtvnw.net/ttv-boxart/516575-188x250.jpg" }' -X POST $base_url/game
    time curl -H 'Content-Type: application/json' -d '{"title": "Fortnite", "bannerUrl": "https://static-cdn.jtvnw.net/ttv-boxart/33214-188x250.jpg" }' -X POST $base_url/game
    time curl -H 'Content-Type: application/json' -d '{"title": "World of WarCraft", "bannerUrl": "https://static-cdn.jtvnw.net/ttv-boxart/18122-188x250.jpg" }' -X POST $base_url/game
    time curl -H 'Content-Type: application/json' -d '{"title": "Conter-Strike", "bannerUrl": "https://static-cdn.jtvnw.net/ttv-boxart/32399_IGDB-188x250.jpg" }' -X POST $base_url/game
    time curl -H 'Content-Type: application/json' -d '{"title": "Dota 2", "bannerUrl": "https://static-cdn.jtvnw.net/ttv-boxart/29595-188x250.jpg" }' -X POST $base_url/game
    time curl -H 'Content-Type: application/json' -d '{"title": "Grand Theft Auto V", "bannerUrl": "https://static-cdn.jtvnw.net/ttv-boxart/32982_IGDB-188x250.jpg" }' -X POST $base_url/game
    line
}

line(){ echo -e "\n:: ================$1================ ::\n"; }

get $base_url/game/178cca1a-2d53-40c4-a630-a73cf2f4cc3d/ads Ads 

get $base_url/game Game

#createGame
