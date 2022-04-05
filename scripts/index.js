
function login(){
    let email = document.getElementById("inputEmail").value.toLowerCase();
    let password = document.getElementById("inputPassword").value;

    

    // verifica se e-mail é vazio ou atendente os requisitos
    if(email != "" && /.com$/.test(email)){
        console.log("teste")
        if(password.length >= 8 && password.length <= 12){
            let clock = 5000; // representa 5 segundos 
            let count = 5
            localStorage.setItem("user", email)

            setTimeout(_ => {
                clearInterval(interval) // limpa o clock a cada 1 segundo
                window.location.href="tarefas.html"
            
            }, clock)

            let interval = setInterval(() => {
                document.getElementsByClassName("message")[0].innerHTML = `Sessão iniciada com sucesso. Aguarde você está sendo redirecionado em ${count--}s ...`
            }, 1000);
        }else{
            document.getElementById("inputPassword").style.borderColor = "red";
            document.getElementsByClassName("message")[0].innerHTML = `A senha deve ter pelo menos 8 caracteres e no máximo 12`;
        }

    }else{
        console.log("aqui")
        document.getElementById("inputEmail").style.borderColor = "red";
        document.getElementsByClassName("message")[0].innerHTML = `E-mail não atende aos requisitos.`;
    }

    form = document.querySelector("form");

    form.addEventListener("submit", e => {
        e.preventDefault();
    })

}


