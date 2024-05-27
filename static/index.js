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

document.addEventListener('DOMContentLoaded', function () {
    const overviewButton = document.getElementById('overviewButton');
    const gamesButton = document.getElementById('gamesButton');
    const overviewContainer = document.getElementById('overviewContainer');
    const gamesContainer = document.getElementById('gamesContainer');
    const loadMoreTrigger = document.getElementById('loadMoreTrigger');
    let offset = 10; // Starting offset for loading more games

    const create = 'create';
    const remove = 'remove';
    
    overviewButton.addEventListener('click', function () {
        toggleTrigger(remove);
        document.body.classList.remove('long');
        gamesButton.classList.remove('active');
        overviewButton.classList.add('active');
        overviewContainer.classList.remove('hidden');
        gamesContainer.classList.add('hidden');
    });
    
    gamesButton.addEventListener('click', function () {
        toggleTrigger(create);
        document.body.classList.add('long');
        gamesButton.classList.add('active');
        overviewButton.classList.remove('active');
        gamesContainer.classList.remove('hidden');
        overviewContainer.classList.add('hidden');
        observe();
    });
    
    function toggleTrigger(state) {
        const loadMoreTrigger = document.getElementById('loadMoreTrigger');
        if (state === create && !loadMoreTrigger) {
            const newLoadMoreTrigger = document.createElement('div');
            newLoadMoreTrigger.id = 'loadMoreTrigger';
            const gamesContainer = document.getElementById('gamesContainer');
            gamesContainer.insertAdjacentElement('afterend', newLoadMoreTrigger);
        } else if (state === remove && loadMoreTrigger) {
            loadMoreTrigger.remove();
        }
    }


        function observe() {
                // intersection observer
            const observer = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    loadMoreGames();
                }
                }, {
                    root: null,
                    rootMargin: '0px',
                    threshold: 1.0
                });
              
                 // intersection observer observes if div is in view
                observer.observe(document.querySelector('#loadMoreTrigger'));
        }
  
    async function loadMoreGames() {
        try {
          const response = await fetch(`/more-games?offset=${offset}&limit=10`);
          const newGames = await response.json();
          newGames.forEach(game => {
            const truncatedSummary = game.summary.length > 200 ? game.summary.substring(0, 200) + '...' : game.summary;
            const gameElement = document.createElement('div');
            gameElement.classList.add('game');
            gameElement.innerHTML = `
              <img src="${game.coverUrl}" alt="${game.name} Cover" />
              <div class="game-details">
                <h2>${game.name}</h2>
                <p>Rating: ${game.rating}</p>
                <p>${truncatedSummary}</p>
              </div>
            `;
            gamesContainer.appendChild(gameElement);
          });
          offset += 10; // Update the offset for the next batch of games
        } catch (error) {
          console.error('Error loading more games:', error);
        }
      }
      
  });