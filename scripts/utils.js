let token = localStorage.getItem('token');
let url = `https://ctd-todo-api.herokuapp.com/v1/users/getMe`;


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
        sessionStorage.setItem('user', `${json.firstName}`)
        document.getElementsByClassName("user-name")[0].innerHTML = `${json.firstName} ${json.lastName}`
    })
    .catch(err => console.error(err));



window.addEventListener("load", e => {
    e.preventDefault();
})
