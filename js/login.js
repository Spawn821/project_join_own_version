/**
 * This function initialize the landing page and preloads all registered Users to match them against input of the current user of the page.
 */
async function loginInit() {
    removeAnimateJoinLogo();
    await loadUsers();
    checkRememberLogin();

    lastSelectedTemplate = 'login_html';
    currentWebsite = 'index';
}


/**
 * This function remove the join logo on the login screen after the animation.
 */
function removeAnimateJoinLogo() {
    setTimeout((() => {
        document.getElementById('login-animation-overlay').classList.add('d-none');
        document.getElementById('login-animation-logo').classList.add('d-none');
        document.getElementById('login-join-logo').classList.remove('v-hidden');
    }), 1150);

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
        passwordInput.src = "assets/img/icon_lock.png";
        password.type = "password";
    } else {
        inputState.setState("filled");
        if (password.value.length == 1) {
            passwordInput.src = "assets/img/icon_eye_visibility_off.png";
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
            img.src = "assets/img/icon_eye_visibility_on.png";
            password.type = "text";
        }
        else {
            img.src = "assets/img/icon_eye_visibility_off.png";
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
    const warning = document.getElementById("wrong-mail-password");

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
    let flag = false;

    users.map((user) => {
        if (!flag) {
            flag = checkDisabledButton(inputField, warning, user, button);
        }
    })
}


/**
 * This function check all conditions to enabled the button or shows a warning text.
 * @param {object} inputField is the input currrent input field.
 * @param {object} warning is the warning text.
 * @param {object} user is the current user from array users.
 * @param {object} button is the button to disabled or not.
 * @returns true.
 */
function checkDisabledButton(inputField, warning, user, button) {
    warning.classList.remove('v-hidden');
    button.disabled = true;

    if (validInput(inputField, user)) {
        warning.classList.add('v-hidden');

        if (inputField.value == user['email']) {
            button.disabled = false;
            return true;
        }
    }
}


/**
 * This function returns to the login page and call a slidebox to shows the action that has taken.
 */
function sendMailResetPassword() {
    const inputField = document.getElementById('reset-email')

    inputField.value = '';

    showTemplate('login_html');
    informationSlidebox('information-slidebox-vertical', 'Email is send to you');
}