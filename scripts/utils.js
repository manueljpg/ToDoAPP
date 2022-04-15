window.addEventListener("load", e => {
    let url = 'https://ctd-todo-api.herokuapp.com/v1/users/getMe'

    let settings = { 
        method: "GET", 
        headers:{ 
            'content-type': 'application/json',
            'authorization': localStorage.getItem('token')
        },
    } 

    fetch(url, settings)
    .then(response => {
        response.json()
    })
    .then(data => {
        console.log(data)
    })
    .catch(err => {
        console.log(err)
    })

    e.preventDefault();
    
})
