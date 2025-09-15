function loginFormSubmit(event) {
        event.preventDefault(); // prevent page reload

        let form = document.forms["loginForm"];
        let username = form["username"].value;
        let password = form["password"].value;

        console.log("Username:", username);
        console.log("Password:", password);
        
        // do login api call here, get token
        // store token in localStorage or some bullshit like that
            // or cookie
        // now redirect with window.location
      }