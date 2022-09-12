
port=3300
base_url=http://localhost:$port

get(){
    line
    time curl $1
    line
}

line(){ echo -e "\n:: =============================== ::\n"; }

get $base_url/ads
