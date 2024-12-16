function addPokemon(myPokemon) {
  let name = myPokemon.getAttribute("pokemon");
  let team = JSON.parse(localStorage.getItem("pokemons"));
  if (team == null) {
    team = [];
    localStorage.setItem("pokemons", JSON.stringify(team));
  }
  if (team.length > 1) {
    alert("solo dos pokemon");
    return;
  }
  team.push(name);
  localStorage.setItem("pokemons", JSON.stringify(team));
  myPokemon.style.cssText = `border: 2px solid rgb(16, 53, 239); border-style:dashed; background-image:url(/images/pc/gifs/${name}.gif); background-size:cover; background-position:center;`;
}
function setStaticPokemon() {
  let pokemons = document.getElementsByClassName("pokemon-static");
  let team = JSON.parse(localStorage.getItem("pokemons"));
  console.log(pokemons);
  let i = 1;
  for (let index = 0; index < pokemons.length; index++) {
    if (index == 0) {
      pokemons[
        index
      ].style.cssText = `background-image: url("/images/pc/gifs/${team[index]}.gif"); left: 38%; animation-delay: 5s;`;
    } else {
      pokemons[
        index
      ].style.cssText = `background-image: url("/images/pc/gifs/${team[index]}.gif"); left:30%; top:40%; animation-delay: 9s;`;
    }
    i++;
  }
}
let container_app = document.getElementById("app");
let container_start = document.getElementById("start");
let button_go = document.getElementById("go");
let button_reset = document.getElementById("reset");
let pokemons_pc = document.querySelectorAll(".pc-pokemons div");
let pokemonMenuContainer = document.getElementById("choosePokes");
container_app.style.display = "none";
button_go.addEventListener("click", () => {
  setStaticPokemon();
  container_start.style.display = "none";
  container_app.style.display = "block";
});
button_reset.addEventListener("click", () => {
  localStorage.clear();
  for (let index = 0; index < pokemons_pc.length; index++) {
    pokemons_pc[index].style  = "";
    
  }
});

for (let index = 0; index < pokemons_pc.length; index++) {
  pokemons_pc[index].addEventListener("click", () => {
    addPokemon(pokemons_pc[index]);
   
  });
}

if (localStorage.getItem("pokemons") !== null) {
  let team = JSON.parse(localStorage.getItem("pokemons"));
  const team_container = document.getElementsByClassName("pokemonTeam");
  for (let index = 0; index < team_container.length; index++) {
    team_container[index].style.backgroundImage = `url(${team[index].img})`;
    team_container[index].addEventListener("click", () => {
      team_container[index].style = "";
    });
  }
}
