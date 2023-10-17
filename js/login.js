/**
 * This function initialize the landing page and preloads all registered Users to match them against input of the current user of the page.
 */
async function loginInit() {
    checkRememberLogin();
    removeAnimateJoinLogo();
}


/**
 * Animates the JoinLogo upon first loading of the page in desktop screen.
 */
function removeAnimateJoinLogo() {
    setTimeout((() => {
        document.getElementById('login-animation-overlay').classList.add('d-none');
        document.getElementById('login-animation-logo').classList.add('d-none');
    }), 900);

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
 * This function handles login of the user and takes actions on UI elements in case of wrong user credentials.
 */
function login() {
    const email = document.getElementById("login-email");
    const password = document.getElementById("login-password");
    const user = users.find(u => u.email == email.value && u.password == password.value);
    const wrongPasswordOrUser = users.find(u => u.email != email.value || u.password != password.value);
    const warning = document.getElementById("login-wrong-mail-password");

    if (user) {
        warning.classList.add('v-hidden');
        rememberLogin(email.value);
        window.location.href = "join.html?name=" + encodeURIComponent(user['name']);
    } else if (wrongPasswordOrUser) {
        warning.classList.remove('v-hidden');
    } else {
        warning.classList.add('v-hidden');
    }
}


/**
 * This function sets the emailaddress of a user to local storage in case the "rememberMe" checkbox is checked. I am aware this is a unsafe way to handle this option.
 * @param {*} email user Email address
 */
function rememberLogin(email) {
    if (document.getElementById('login-checkbox').checked) {
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
 * @param {*} email is the saved email from local storage.
 * @returns username.
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
function loginAsGuest() {
    window.location.href = "join.html?name=" + encodeURIComponent("Guest");
}


/**
 * This funcion compare the input email with the data in array users.
 */
function compareInputEmailWithUsers() {
    const inputField = document.getElementById('reset-email')
    const warning = document.getElementById('signup-wrong-mail');
    let button = document.getElementById('send_mail_btn');

    users.map((user) => {
        warning.classList.remove('v-hidden');
        button.disabled = true;

        if (validInput(inputField, user)) {
            warning.classList.add('v-hidden');

            if (inputField.value == user['email']) {
                button.disabled = false;
            }
        }
    })
}


function validInput(inputField, user) {
    const validInput = inputField.value != '';
    const validWithUsers = user['email'].toLowerCase().includes(inputField.value.toLowerCase());
    const validWithSign = inputField.value.includes('@');

    return validInput && validWithUsers && validWithSign; 
}


function sendMailResetPassword() {
    const inputField = document.getElementById('reset-email')

    inputField.value = '';

    showTemplate('login_html');
    informationSlidebox('Email is send to you');
}