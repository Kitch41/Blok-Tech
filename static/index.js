const home = document.querySelector('.home');
const explore = document.querySelector('.explore');
const myGames = document.querySelector('.mygames');
const myBuddys = document.querySelector('.mybuddys');

const activeyn = 0;

function activateexplore(){
  if (activeyn == 0){
    explore.classList.add("active");
    myGames.classList.remove("active");
    myBuddys.classList.remove("active");  
    activeyn = 1;
  }
  else {
    explore.classList.remove("active");
      activeyn = 0;
  }
}
function activatemyGames(){
  if (activeyn == 0){
    myGames.classList.add("active");
    explore.classList.remove("active");
    myBuddys.classList.remove("active");  
    activeyn = 1;
  }
  else {
      myGames.classList.remove("active");
    activeyn = 0;
  }
}
function activatemyBuddys(){
  if (activeyn == 0){
    myBuddys.classList.add("active");
    explore.classList.remove("active");
    myGames.classList.remove("active");  
    activeyn = 1;
  }
  else {
    myBuddys.classList.remove("active");
    activeyn = 0;
  }
}


explore.addEventListener("click", activateexplore);
myGames.addEventListener("click", activatemyGames);
myBuddys.addEventListener("click", activatemyBuddys);