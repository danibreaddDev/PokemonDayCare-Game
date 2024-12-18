//app
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
  console.log(pokemons);

  let myTeamElements = pokemons.filter((element, index) => index < 2);
  let team = JSON.parse(localStorage.getItem("pokemons"));
  myTeamElements[0].setAttribute("task", 1);
  myTeamElements[0].style.cssText = `background-image: url("/images/pc/gifs/${team[0]}.gif"); left:50%; animation-delay: 5s;`;
  myTeamElements[1].setAttribute("task", 2);
  myTeamElements[1].style.cssText = `background-image: url("/images/pc/gifs/${team[1]}.gif"); left:45%; top:40%; animation-delay: 9s;`;
}
let container_app = document.getElementById("app");
let container_start = document.getElementById("start");
let button_go = document.getElementById("go");
let button_reset = document.getElementById("reset");
let pokemons_pc = document.querySelectorAll(".pc-pokemons div");
let audio = document.querySelectorAll("audio");
let container_loading = document.getElementById("loading");
let btn_reload = "";
audio[0].src = "/audio/temon.mp3";
let pokemonMenuContainer = document.getElementById("choosePokes");
let pokemons = Array.from(document.querySelectorAll(".pokemon-static"));
let dialog = document.querySelector("dialog");
container_app.style.display = "none";
button_go.addEventListener("click", () => {
  if (localStorage.getItem("pokemons") == null) {
    dialog.innerHTML = ` <div><h3>Selecciona Pokemon</h3>
        <button class="btn_app" id="cerrar">Cerrar</button></div>`;
    let btn_cerrar = document.getElementById("cerrar");
    btn_cerrar.addEventListener("click", () => {
      dialog.close();
    });
    dialog.showModal();
  } else {
    console.log(audio);
    audio[0].src = "audio/theme.mp3";
    setStaticPokemon();
    container_start.style.display = "none";
    container_loading.style.display = "flex";
    setTimeout(() => {
      container_loading.style.display = "none";
      container_app.style.display = "block";
    }, 4000);

    addDivsTasks();
  }
});
button_reset.addEventListener("click", () => {
  localStorage.clear();
  for (let index = 0; index < pokemons_pc.length; index++) {
    pokemons_pc[index].style = "";
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
//game
class Task {
  id;
  description;
  completed;
  constructor(id, description, completed) {
    this.id = id;
    this.description = description;
    this.completed = completed;
  }
  set id(id) {
    this.id = id;
  }
  get id() {
    return this.id;
  }
  set description(description) {
    this.description = description;
  }
  get description() {
    return this.description;
  }
  set completed(completed) {
    this.completed = completed;
  }
  get completed() {
    return this.completed;
  }
}

function addTasks() {
  let team = JSON.parse(localStorage.getItem("pokemons"));
  let arr_tasks = [
    new Task(1, `Acaricia a ${team[0]}`, false),
    new Task(2, `Acaricia a ${team[1]}`, false),
    new Task(3, "Acaricia a Golduck", false),
    new Task(4, "Acaricia a dragonair", false),
  ];
  localStorage.setItem("tasks", JSON.stringify(arr_tasks));
}
function addDivsTasks() {
  addTasks();
  let storageTasks = JSON.parse(localStorage.getItem("tasks"));
  console.log("Tareas guardadas:", JSON.parse(localStorage.getItem("tasks")));
  let tasks = document.getElementsByClassName("tasks")[0];
  for (let index = 0; index < storageTasks.length; index++) {
    let task_div = document.createElement("div");
    task_div.className = "task";
    task_div.innerHTML = `<p>${storageTasks[index].id}.${storageTasks[index].description}</p>`;
    tasks.appendChild(task_div);
  }
  for (let index = 0; index < pokemons.length; index++) {
    pokemons[index].addEventListener("click", () => {
      completeTask(pokemons[index].getAttribute("task"));
      updateDivTask(pokemons[index].getAttribute("task"));
      if (checkWin()) {
        setTimeout(() => {
          dialog.innerHTML = ` <div><h3>Has realizado todas las tareas, Entrenador/a!</h3>
          <button class="btn_app" id="reload_app">Reiniciar</button></div>`;
          btn_reload = document.getElementById("reload_app");
          btn_reload.addEventListener("click", () => {
            localStorage.clear();
            location.reload();
          });
          dialog.showModal();
        }, 500);
      }
    });
  }
}
function completeTask(idTask) {
  let storageTasks = JSON.parse(localStorage.getItem("tasks"));
  console.log(idTask);

  let taskForComplete = storageTasks.find(
    (task) => task.id === parseInt(idTask)
  );
  console.log(taskForComplete);

  taskForComplete.completed = true;
  localStorage.setItem("tasks", JSON.stringify(storageTasks));
}
function updateDivTask(idTask) {
  console.log(idTask);

  let tasks = Array.from(document.querySelectorAll(".task"));
  console.log(tasks);
  let task = tasks.find((p) => {
    return p.getElementsByTagName("p")[0].innerText.includes(idTask);
  });
  console.log(task);
  task.querySelector("p").style.color = "green";
  let svg_element = document.createElement("svg");
  svg_element.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="green" d="M18 6h2v2h-2zm-2 4V8h2v2zm-2 2v-2h2v2zm-2 2h2v-2h-2zm-2 2h2v-2h-2zm-2 0v2h2v-2zm-2-2h2v2H6zm0 0H4v-2h2z"/></svg>';
  task.appendChild(svg_element);
}
function checkWin() {
  return JSON.parse(localStorage.getItem("tasks")).every(
    (task) => task.completed === true
  );
}
