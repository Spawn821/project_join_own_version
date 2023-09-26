/**
 * This function initialize the landing page and preloads all registered Users to match them against input of the current user of the page.
 */
async function loginInit() {
/*     animateJoinLogo(); */
    await includeHTML();
/*     await loadUsers(); */
/*     checkRememberLogin(); */
    setTimeout((() => {
        document.getElementById('login-animation-overlay').classList.add('d-none');
    }), 900);
}


/**
 * This function toggles elements of the landing page (index.html) if any other form than "login" is active on the page. 
 * @param {*} filename defines the HTML template name of the current active form.
 */
function toggleUiElements(filename) {
    if (filename != 'login.html') {
        document.getElementById('not-a-user-box').classList.add('d-none');
    } else {
        document.getElementById('not-a-user-box').classList.remove('d-none');
    }
}


/**
 * This class is saving the current state of the input field. This class is used in function updateInputState() and toggleReveal().
 */
class InputState {

    constructor() {
        this.state = "empty";
    }

    setState(newState) {
        if (["empty", "filled"].includes(newState)) {
            this.state = newState;
        } else {
            console.error("Invalid state:", newState);
        }
    }

    getState() {
        return this.state;
    }
}
const inputState = new InputState();


/**
 * This function toggles the icon of the password input field. If the field contains more than one character it switches the icon and switches back if the field is empty again.
 * @param {*} element defines the input field.
 * @param {*} idToToggle defines the ID of the icon-element to be toggled.
 */
function updateInputState(element, idToToggle) {
    const passwordInput = document.getElementById(idToToggle);
    const password = element;

    if (password.value == "") {
        inputState.setState("empty");
        passwordInput.src = "/assets/img/icon_lock.png";
        password.type = "password";
    } else {
        inputState.setState("filled");
        if (password.value.length == 1) {
            passwordInput.src = "/assets/img/icon_eye_visibility_off.png";
        }
    }
/*     if (document.getElementById('formElement').innerHTML.includes('form_signup')) {
        validateSignUp();
    } */
}


/**
 * This function lets the user reveal the password in password input fields.
 * @param {*} img defines the image element to be toggled upon password reveal or hide.
 * @param {*} id defines the password input field.
 */
function toggleReveal(img, id) {
    const password = document.getElementById(id);

    if (inputState.getState() == "filled") {
        if (password.type == "password") {
            img.src = "/assets/img/icon_eye_visibility_on.png";
            password.type = "text";
        }
        else {
            img.src = "/assets/img/icon_eye_visibility_off.png";
            password.type = "password";
        }
    }

    password.focus();
}


/**
 * Animates the JoinLogo upon first loading of the page in desktop screen.
 */
function animateJoinLogo() {
    const animationOverlay = document.getElementById("animationOverlay");
    animationOverlay.classList.remove('d-none');
    setTimeout(function () {
        animationOverlay.classList.add('d-none');
    }, 990);
    animateIteration = 1;
}


/**
 * If password is reset, it triggers a message.
 */
function resetPassword() {
    successMessage('You reset your password');
}


/**
 * If password is sent to user, it triggers a message.
 */
function forgotPassword() {
    const message = /*html*/ `
        <img src="assets/img/email_send.svg"> An Email has been sent to you
    `;
    successMessage(message);
    document.getElementById('btn_sendMail').classList.add('d-none');
}


/**
 * This function handles login of the user and takes actions on UI elements in case of wrong user credentials.
 */
function login() {
    const email = document.getElementById("inputEmail");
    const password = document.getElementById("inputPassword");
    const user = users.find(u => u.email == email.value && u.password == password.value);
    const wrongPasswordOrUser = users.find(u => u.email != email.value || u.password != password.value);
    const warning = document.getElementById("password_warning");
    const passwordTextbox = document.getElementById("inputPassword");

    if (user) {
        warning.classList.add('invisible');
        passwordTextbox.classList.remove('redBorder');
        rememberLogin(email.value);
        window.location.href = "join.html?name=" + encodeURIComponent(user['name']);
    } else if (wrongPasswordOrUser) {
        warning.classList.remove('invisible');
        passwordTextbox.classList.add('redBorder');
    } else {
        warning.classList.add('invisible');
        passwordTextbox.classList.remove('redBorder');
    }
}


/**
 * This function sets the emailaddress of a user to local storage in case the "rememberMe" checkbox is checked. I am aware this is a unsafe way to handle this option.
 * @param {*} email user Email address
 */
function rememberLogin(email) {
    if (document.getElementById('myCheckbox').checked) {
        localStorage.setItem('email', email);
    }
}


/**
 * This function checks if a user has "rememberMe" option selected on last login.
 */
function checkRememberLogin() {
    const email = localStorage.getItem('email');
    if (email) {
        const user = getUserFromEmail(email);
        window.location.href = "join.html?name=" + encodeURIComponent(user);
    }
}


/**
 * This function returns the username of registered users linked to a matching email address.
 * @param {*} email 
 * @returns 
 */
function getUserFromEmail(email) {
    for (let i = 0; i < users.length; i++) {
        const element = users[i]['email'];
        if (element === email) return users[i]['name']
    }
}


/**
 * This function handles login as a "Guest".
 */
function guest() {
    window.location.href = "join.html?name=" + encodeURIComponent("Guest");
}