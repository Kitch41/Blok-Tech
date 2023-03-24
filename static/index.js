const url = "https://playerdb.co/api/player/steam/"
const id = "kitchen2002"
const fullurl = url+id



async  function getData(steamdb) {
    try {
        return(
            fetch(steamdb) 
            .then ( 
                response => response.json()
            )
            .then(
                // (data) => console.log(data.Plot) 
                jsonData => jsonData
            )
        ) 
    } catch {
        console.log("Fetch api failed")
    }


}

getData(fullurl).then( data => {
    try {
        console.log(data);
    document.getElementById("steamusername").innerHTML = "Steam Username: " +data.data.player.username
    } catch {
        console.log("submit data into index failed")
        document.getElementById("steamusername").innerHTML = "Steam Username: Not Found"
    }
})