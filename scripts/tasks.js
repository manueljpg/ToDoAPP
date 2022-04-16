
function listtask() {
  let url = `https://ctd-todo-api.herokuapp.com/v1/tasks`;
  let settings = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  fetch(url, settings)
    .then((response) => response.json())
    .then((json) => {
      let schemaA = document.getElementById("skeleton");
      let schemaB = document.getElementById("closed");
      schemaA.innerHTML = "";
      schemaB.innerHTML = "";
      json.forEach((e) => {
        if (e.completed == false) {
          schemaA.innerHTML += `
                    <li class="tarefa">
                        <div class="not-done">
                        <button type="button" onclick="editTaskStatus(${e.id}, true)"><i class="fas fa-check"></i>
                        </button>
                        </div>

                        <div class="descricao">
                            <p class="nome" id="desc_${e.id}">${e.description}</p>
                            <p class="timestamp">Criada em: ${e.createdAt}</p>
                        </div>
                    </li>
            `;
        } else {
          schemaB.innerHTML += `
          <li class="tarefa">
          <div class="done"></div>
          <div class="descricao">
          <p class="nome" id="desc_${e.id}">${e.description}</p>
          <div>
          <button onclick="editTaskStatus(${e.id},false)"><i id="${e.id}" class="fas
          fa-undo-alt change"></i></button>
          <button onclick="deleteTask(${e.id})"><i id="" class="far
          fa-trash-alt"></i></button>
          </div>
          </div>
          </li>
                `;
        }
      });
    })
    .catch((err) => console.error(err));
}

window.onload = function () {
  listtask();
};

function createTask() {
  let task = document.getElementById("novaTarea").value;
  if (task == "" || task == " ") {
    alert("Campo de tarefas não pode estar vazio");
    return false;
  }
  let url = `https://ctd-todo-api.herokuapp.com/v1/tasks`;

  let settings = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      description: task,
      completed: false,
    }),
  };

  fetch(url, settings)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      listtask();
      document.getElementById("novaTarea").value='';
    })
    .catch((err) => console.error(err));
}

addEventListener("submit", (e) => {
  e.preventDefault();
});

function editTaskStatus(id, status) {
    let url = `https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`;
    let description = document.getElementById("desc_"+id).innerHTML;
    let settings = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          description: description,
          completed: status,
        }),
      }
      fetch(url, settings)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      listtask();
    })
    .catch((err) => console.error(err));

}

function deleteTask(id) {
    let url = `https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`;
    let settings = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        
      }
      fetch(url, settings)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      listtask();
    })
    .catch((err) => console.error(err));
}