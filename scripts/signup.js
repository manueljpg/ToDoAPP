
function register(){
    let firstName = document.getElementById("firstName").value.trim();
    let lastName = document.getElementById("lastName").value.trim();
    let email = document.getElementById("email").value.toLowerCase();
    let password = document.getElementById("password").value;
    let repeatPassword = document.getElementById("repeatPassword").value;

     

    // verifica se e-mail é vazio ou atendente os requisitos
    if ((password != "") && (repeatPassword != "") && (password === repeatPassword) && (password.length >= 8) && (password.length < 12) && /.com$/.test(email)){
        if(firstName =="" && lastName==""){
            document.getElementsByClassName("message")[0].innerHTML = `O nome e o sobrenome não podem ser vazios!`;
        }else{
            let clock = 5000; // representa 5 segundos 
            let count = 5
            localStorage.setItem("user", [{"firstName":firstName, "lastName":lastName, "email":email, "password":password}])

            setTimeout(_ => {
                clearInterval(interval) // limpa o clock a cada 1 segundo
                window.location.href="index.html"
            
            }, clock)

            let interval = setInterval(() => {
                document.getElementsByClassName("message")[0].innerHTML = `Cadastro realizado com sucesso! Direcionando para Login em ${count--}s ...`
            }, 1000);
        }

    }else{
        document.getElementsByClassName("message")[0].innerHTML = `Todos os dados precisam ser preenchidos corretamente!`;
    }

    let form = document.querySelector("form");

    form.addEventListener("submit", e => {
        e.preventDefault();
    })

}



