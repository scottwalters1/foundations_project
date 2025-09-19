function loginFormSubmit(event) {
        event.preventDefault(); 
        let form = document.forms["loginForm"];
        let username = form["username"].value;
        let password = form["password"].value;

        console.log("Username:", username);
        console.log("Password:", password);
      }