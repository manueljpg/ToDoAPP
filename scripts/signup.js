let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let email = document.getElementById("email");
let password = document.getElementById("password");
let repeatPassword = document.getElementById("repeatPassword");

let form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    newUser()
})

const newUser = () => {
  
  mostrarSpinner(); 

  if (password.value != "" && repeatPassword.value != "" && password.value === repeatPassword.value && password.value.length >= 8 && password.value.length < 12 && /.com$/.test(email.value) && firstName.value != "" && lastName.value != "") {
    
    let settings = {
      method: "POST",
      headers: {
       'content-type': 'application/json'
     },
       body: JSON.stringify({     
         firstName: firstName.value.toString(),
         lastName: lastName.value.toString(),
         email: email.value.toString(),
         password: password.value.toString(),
       }),
     };

    const url = 'https://ctd-todo-api.herokuapp.com/v1/users';
    
    fetch(url, settings)
      .then(response => {
        console.log(response)
        return response.json()
      })
      .then(_ => {
        setTimeout(() => {
          window.location.href = 'index.html'
       }, 3000);
       ocultarSpinner();
      })
      .catch(error => {
        console.log(error)
        ocultarSpinner();
      });

  }

  else {
    alert("Certifique-se que os campos estão preenchidos corretamente")
  }
}    

