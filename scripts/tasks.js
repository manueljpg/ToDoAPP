




window.onload = function(){
    let url = `https://ctd-todo-api.herokuapp.com/v1/tasks`;
    let token = localStorage.getItem('token');
    let settings = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": token,
        },
    }

    fetch(url, settings)
    .then(response => response.json())
    .then(json => {
        let schemaA = document.getElementById("skeleton");
        let schemaB = document.getElementById("closed");
        json.forEach(e => {
            if(e.completed == false){
                schemaA.innerHTML += `
                    <li class="tarefa">
                        <div class="not-done"></div>
                        <div class="descricao">
                            <p class="nome">${e.description}</p>
                            <p class="timestamp">Criada em: ${e.createdAt}</p>
                        </div>
                    </li>
            `
            }else{
                schemaB.innerHTML += `
                    <li class="tarefa">
                    <div class="not-done"></div>
                    <div class="descricao">
                        <p class="nome">${e.description}</p>
                        <p class="timestamp">Criada em: ${e.createdAt}</p>
                    </div>
                    </li>
                `
            }
           
        });
    })
    .catch(err => console.error(err))
}

    
function createTask(){
    let task = document.getElementById("novaTarea").value;
    let token = localStorage.getItem('token');
    let url = `https://ctd-todo-api.herokuapp.com/v1/tasks`;
    
    let settings = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": token,
        },
        body: JSON.stringify({
            "description": task,
            "completed": false,
        })
    }


    fetch(url, settings)
        .then(response => response.json())
        .then(json => {
            console.log(json)
        })
        .catch(err => console.error(err));
}

addEventListener("submit", e => {
    e.preventDefault();
})