session = localStorage.getItem("token")

if(!session) {
    window.location.href = "/"
}

window.onload = function () {
  listtask();
};

function timeMensagem(){
  setTimeout(e => {
    document.getElementsByClassName("mensagem")[0].innerHTML = ``
    listtask();
  }, 4000)
}


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
    .then((tasks) => {
      let schemaA = document.getElementById("skeleton");
      let schemaB = document.getElementById("closed");
      schemaA.innerHTML = "";
      schemaB.innerHTML = "";

      tasks.forEach((task) => {
        let datingCreation = new Date(task.createdAt);
        datingCreation.toLocaleDateString('pt-BR');
        datingCreation = datingCreation.getDate() + 
        "/" + (datingCreation.getMonth() + 1) + "/" + datingCreation.getFullYear() 
        + " | " + datingCreation.getHours() + ':' + datingCreation.getMinutes();

        if (task.completed == false) {
          schemaA.innerHTML += templateTask(task, datingCreation)
        } else {
          schemaB.innerHTML += templateTask(task, datingCreation)
        }
      });
    })
    .catch((err) => console.error(err));
};


let templateTask = (task, date) => {
    let template = '';

    if (task.completed == false) {
      template = `
      <li class="tarefa">
          <div class="not-done">
            <button type="button" onclick="editTaskStatus(${task.id}, true)">
            <span class="material-icons">schedule</span>
            </button>
          </div>

          <div class="descricao">
              <p class="nome" id="desc_${task.id}">${task.description}</p>
              <p class="timestamp">Criada em: ${date}</p>
          </div>
      </li>`
    } else {
        template =  `
          <li class="tarefa">
            <div class="done">
              <span class="material-icons">check</span>
            </div>

            <div class="descricao">
              <p class="nome" id="desc_${task.id}">${task.description}</p>
              <div>
                <button onclick="editTaskStatus(${task.id},false)"><i id="${task.id}" class="fas
                fa-undo-alt change"></i></button>
                <button onclick="deleteTask(${task.id})"><i class='fas fa-trash-alt'>
                </i></button>
              </div>
            </div>
          </li>
                `;
        }
    return template;
}




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
      listtask();
      document.getElementById("novaTarea").value='';
    })
    .catch((err) => console.error(err));
    
}

function editTaskStatus(id, status) {
    if(status){
      var txt = "Terminadas"
    }else{
      var txt = "Pendentes"
    }

    if(confirm(`Tem certeza que deseja mover a tafera para ${txt}?`)){
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
        document.getElementsByClassName("mensagem")[0].innerHTML = `Tarefa <b>${json.description}</b> atualizada para <b>${txt}</b>!`
        listtask();
        timeMensagem();
      })
      .catch((err) => console.error(err));
    }else{
      document.getElementsByClassName("mensagem")[0].innerHTML = `A tarefa não foi atualizada!`
      timeMensagem();
    }
}


function deleteTask(id) {

  if(confirm(`Tem certeza que deseja remover esta tarefa?`)){
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
      document.getElementsByClassName("mensagem")[0].innerHTML = `A tarefa foi excluída com sucesso!`
      listtask();
      timeMensagem();
    })
    .catch((err) => console.error(err));
  }else{
    document.getElementsByClassName("mensagem")[0].innerHTML = `A tarefa não excluída!`
    timeMensagem();
  }
}


function removeSession(){
  localStorage.removeItem("token");
  window.location.href = "/"
}


addEventListener("submit", (e) => {
  e.preventDefault();
});

