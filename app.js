
function addPokemon(myPokemon) {
  let team = JSON.parse(localStorage.getItem("pokemons"));
  if (team == null) {
    team = [];
    localStorage.setItem("pokemons", JSON.stringify(team));
  }
  if (team.length > 1) {
    alert("solo dos pokemon");
    return;
  }

  const pokemon = {
    name: myPokemon.name,
    img: myPokemon.sprites.front_default,
  };

  team.push(pokemon);
  localStorage.setItem("pokemons", JSON.stringify(team));
  const team_container = document.getElementsByClassName("pokemonTeam");
  for (let index = 0; index < team_container.length; index++) {
    team_container[index].style.backgroundImage = `url(${team[index].img})`;
  }
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
      ].style.cssText = `background-image: url(${team[index].img}); left: 31%;`;
    } else {
      pokemons[
        index
      ].style.cssText = `background-image: url(${team[index].img}); right: 31%;`;
    }
    i++;
  }
}
let container_app = document.getElementById("app");
let container_start = document.getElementById("start");
let button_go = document.getElementById("go");
let pokemonMenuContainer = document.getElementById("choosePokes");
container_app.style.display = "none";
button_go.addEventListener("click", () => {
  setStaticPokemon();
  container_start.style.display = "none";
  container_app.style.display = "block";
});
let button_add = document.getElementById("add");

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
