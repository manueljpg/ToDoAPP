




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
       
        for(let i=0; i<json.length; i++){
            document.getElementsByClassName("tarefa").innerHTML = `
            <div class="not-done"></div>
            <div class="descricao">
              <p class="nome">Nova tarefa</p>
              <p class="timestamp">Criada em: 15/07/21</p>
            </div>
          
            `
        }
    })
    .catch(err => console.error(err))
}

    

addEventListener("submit", e => {
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
    
})