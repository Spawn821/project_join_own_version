let users = [];


/**
 * This function is registering a user on signup and saves the data to backend.
 */
async function register() {
    informationSlidebox('You signed up successfully');

    const username = document.getElementById('signup-username');
    const usermail = document.getElementById('signup-mail');
    const password = document.getElementById('signup-password');
    const confirmPassword = document.getElementById('signup-confirm-password');

    users.push({
        name: username.value,
        email: usermail.value,
        password: password.value,
        phone: ""
    });

    [users, currentContactIndex] = sortUsers();

    await setItem('users', JSON.stringify(users));
    resetForm(username, usermail, password, confirmPassword);
    showTemplate('login_html');
}


/**
 * This function clears the Signup form.
 * @param {*} username 
 * @param {*} usermail 
 * @param {*} password 
 * @param {*} confirmPassword 
 * @param {*} signupBtn 
 */
function resetForm(username, usermail, password, confirmPassword) {
    username.value = "";
    usermail.value = "";
    password.value = "";
    confirmPassword.value = "";
    document.getElementById('signup-checkbox').checked = false;
    document.getElementById('signup-btn').disabled = true;
}


/**
 * This function validates the input of user on signing up. Things being checked through sub-functions: passwords are identical, username and email are not empty.
 */
function validateSignUp() {
    let signupBtn = document.getElementById('signup-btn');
    const compareUserNameAndMail = validateUserNameAndMail();
    const comparePasswords = validatePasswords();
    const checkbox = document.getElementById('signup-checkbox').checked;

    if (compareUserNameAndMail && comparePasswords && checkbox) {
        signupBtn.disabled = false;
    } else {
        signupBtn.disabled = true;
    }
}


/**
 * This function checks if both username or email are empty.
 * @returns boolean state wether username and email address are empty.
 */
function validateUserNameAndMail() {
    const username = document.getElementById('signup-username').value;
    const mail = document.getElementById('signup-mail').value;

    if (username != "" && mail != "") {
        return true;
    } else {
        return false;
    }
}


/**
 * This function checks if password and confirm password values are identical.
 * @returns boolean state for passwords being identical or not.
 */
function validatePasswords() {
    let warningText = document.getElementById('signup-wrong-mail-password');
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;

    if (password === confirmPassword) {
        warningText.classList.add('v-hidden');
        return true;
    } else {
        warningText.classList.remove('v-hidden');
        return false;
    }
}