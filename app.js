async function getPokemon(myPokemon) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${myPokemon}`
    );

    if (!response.ok) {
      throw new Error("error");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("error", error);
  }
}
function addPokemon(myPokemon) {
  const team = JSON.parse(localStorage.getItem("pokemons"));
  if (team == null) {
    team = [];
    localStorage.setItem("pokemons",JSON.stringify(team));
  }
  if (team.length > 1) {
    button_add.setAttribute("disabled");
    return;
  }
  console.log(myPokemon);
  const team_container = document.getElementById("team");
  const newPokemon = document.createElement("div");
  newPokemon.innerHTML = `<img src='${myPokemon.sprites.front_default}'/>`;
  team_container.appendChild(newPokemon);
}
let container_app = document.getElementById("app");
let container_start = document.getElementById("start");
let button_go = document.getElementById("go");
let pokemonMenuContainer = document.getElementById("choosePokes");
container_app.style.display = "none";
button_go.addEventListener("click", () => {
  container_start.style.display = "none";
  container_app.style.display = "block";
});
let button_add = document.getElementById("add");
button_add.addEventListener("click", async (e) => {
  e.preventDefault();
  const pokemon = document.getElementById("pokemon").value;
  console.log(pokemon);
  const myPokemon = await getPokemon(pokemon);
  console.log(myPokemon);
  addPokemon(myPokemon);
});
