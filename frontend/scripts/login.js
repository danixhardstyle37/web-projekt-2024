import service from './service.js'


$(".email-signup").hide();
//$(".token-verification").hide(); 

$("#signup-box-link").click(function(){
    $(".email-login").fadeOut(100);
    $(".email-signup").delay(100).fadeIn(100);
    $("#login-box-link").removeClass("active");
    $("#signup-box-link").addClass("active");
});

$("#login-box-link").click(function(){
    $(".email-login").delay(100).fadeIn(100);
    $(".email-signup").fadeOut(100);
    $(".token-verification").fadeOut(100); 
    $("#login-box-link").addClass("active");
    $("#signup-box-link").removeClass("active");
});


document
  .getElementById('registrationform')
  .addEventListener('submit', formSubmit);

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

async function formSubmit(e) {
    e.preventDefault();

    let fullName = document.querySelector('#name').value + " " + document.querySelector('#lastName').value;
    let email = document.querySelector('#email').value;
    let username = document.querySelector('#username').value;
    let password1 = document.querySelector('#password1').value;
    let password2 = document.querySelector('#password2').value;

    if (!isValidPassword(password1)) {
        console.log("Invalid password. Password must have at least 1 uppercase letter and at least 1 number.");
        document.querySelector('.alert').textContent = 'Error: Password must have at least 1 uppercase letter and at least 1 number.';
        document.querySelector('.alert').style.display = 'block';
        return;
    }

    if (password1 !== password2) {
        console.log("Passwords do not match.");
        document.querySelector('.alert').textContent = ''; 
        document.querySelector('.alert').style.display = 'none'; 
        document.querySelector('#passwordMismatchAlert').textContent = 'Error: Passwords do not match.';
        document.querySelector('#passwordMismatchAlert').style.display = 'block';
        return;
    }


    try {
        const existingUser = await service.getKorisnikByEmail(email);
        const existingUsername = await service.getKorisnikByUsername(username);

        if (existingUser || existingUsername) {
            console.log("Email or username already exists.");
            document.querySelector('#passwordMismatchAlert').textContent = 'Error: This email or username is already registered.';
            document.querySelector('#passwordMismatchAlert').style.display = 'block';
            return;
        }

        const hashedPassword = await hashPassword(password1);
        sendMessage(fullName, email, username, hashedPassword);
    } catch (error) {
        console.error("Error querying the database:", error);
    }
}

function isValidPassword(password) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/;
    return passwordRegex.test(password);
}

async function sendMessage(fullName, email, username, hashedPassword) {
    const data = {
        username: username,
        password: hashedPassword,
        ime_prezime: fullName,
        email: email
    };

    const response = await service.addKorisnik(data);
    console.log(response);
    
    if (response) {
        console.log("Yes we here");
        /*$(".email-signup").fadeOut(100);
        $(".lb-header").fadeOut(100);
        $(".token-verification").fadeIn(100);*/
        handleSuccessfulLogin(username);
        redirectToHomePage();
    }
}

document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        signIn(username, password);
});

async function signIn(username, password) {
    try {
        const existingUser = await service.getKorisnikByUsername(username);
        if (existingUser) {
                const hashedPassword = existingUser.password;
                const providedPasswordHash = await hashPassword(password);

                if (hashedPassword === providedPasswordHash) {
                    console.log("Login successful.");
                    handleSuccessfulLogin(existingUser.username);
                    redirectToHomePage();
                } else {
                    console.log("Incorrect password.");
                    document.querySelector('#loginAlert').textContent = 'Error: Incorrect username or password.';
                    document.querySelector('#loginAlert').style.display = 'block';
                }
            } else {
                console.log("Username not found.");
                document.querySelector('#loginAlert').textContent = 'Error: Incorrect username or password.';
                document.querySelector('#loginAlert').style.display = 'block';
            }
    } catch (error) {
        console.error("Error querying the database:", error);
    }
}

function handleSuccessfulLogin(username) {
    localStorage.setItem('username', username);
}

function redirectToHomePage(){
    window.location.href = "index.html";
}


  function handleLogout() {
    localStorage.removeItem('username');
    window.location.href = 'logout.html';
  }