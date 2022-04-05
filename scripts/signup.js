function register() {
    //Capturando o evento e colocando um PreventDefault para evitar carregar pagina

    let form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });


  //Normalização dos dados que usuario insere para realizar o cadastro
  let firstName = document.getElementById("firstName").value.trim();
  let lastName = document.getElementById("lastName").value.trim();
  let email = document.getElementById("email").value.toLowerCase();
  let password = document.getElementById("password").value;
  let repeatPassword = document.getElementById("repeatPassword").value;


  // Validação dos dados inseridos pelo usuario
  if (
    password != "" &&
    repeatPassword != "" &&
    password === repeatPassword &&
    password.length >= 8 &&
    password.length < 12 &&
    /.com$/.test(email)
  ) {
    if (firstName == "" && lastName == "") {
      document.getElementsByClassName(
        "message"
      )[0].innerHTML = `O nome e o sobrenome não podem ser vazios!`;
    } else {
      let clock = 5000; // representa 5 segundos
      let count = 5;
      localStorage.setItem("user", [
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        },
      ]);

      setTimeout((_) => {
        clearInterval(interval); // limpa o clock a cada 1 segundo
        window.location.href = "index.html";
      }, clock);

      //Preparação do objeto normalizado para o registro na API
      let registerData = {
        method: "POST",

        headers: {
          "Content-type": "application.json",
        },

        body: JSON.stringify({
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          pasword: password.value,
        }),
      };

      fetch("https://ctd-todo-api.herokuapp.com/v1/users", registerData)

        .then((response)=>{

            if (response.status == 201) {
                return response.json()}
                throw response;
            })
            
        .then(function(answer) {
                successSignIn(firstName.value, lastName.value, email.value, answer.jwt)
            })

        .catch(error=>{
            SignInError(error)
        });

        

      let interval = setInterval(() => {
        document.getElementsByClassName(
          "message"
        )[0].innerHTML = `Cadastro realizado com sucesso! Direcionando para Login em ${count--}s ...`;
      }, 1000);
    }
  } else {
    document.getElementsByClassName(
      "message"
    )[0].innerHTML = `Todos os dados precisam ser preenchidos corretamente!`;
  }

  //Criando a funcao successSignIn que será executada uma vez recebido token do usuario

  function successSignIn(firstName, lastName, email, answer) {
      localStorage.setItem("user", JSON.stringify({firstName:firstName, lastName:lastName, email:email, token:answer}));
      alert("Usuario cadastrado com sucesso")

      //Redirecionando o usuario para página onde serão criadas as cards de tarefas
      window.location.href = "tarefas.html"
  }

  // Em caso do usuario não poder realizar o cadastro, mostrar uma mensagem com código de erro. Como fazer um card??
  function SignInError(error) {
      return ` Erro ao realizar o cadastro ${error}`
  }
}
