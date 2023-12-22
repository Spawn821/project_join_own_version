/**
 * This function is registering a user on signup and saves the data to backend.
 */
async function register() {
    const username = document.getElementById('signup-username');
    const usermail = document.getElementById('signup-mail');
    const password = document.getElementById('signup-password');
    const confirmPassword = document.getElementById('signup-confirm-password');

    users.push(returnUser(username, usermail, password));

    [users, currentContactIndex] = sortUsers();

    await setItem('users', JSON.stringify(users));
    resetForm(username, usermail, password, confirmPassword);
    showTemplate('login_html');
    informationSlidebox('information-slidebox-vertical', 'You signed up successfully');
}


function returnUser(username, usermail, password) {
    return {
        name: username.value,
        email: usermail.value,
        password: password.value,
        phone: ""
    };
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
 * This function validates the input of user on signing up. 
 * Things being checked through sub-functions: passwords are identical, username and email are not empty.
 */
function validateSignUp() {
    let signupBtn = document.getElementById('signup-btn');
    const compareUserNameAndMail = validateUserNameAndMail();
    const emailExist = vaildateEmailAlreadyExist();
    const comparePasswords = validatePasswords();
    const checkbox = document.getElementById('signup-checkbox').checked;

    if (compareUserNameAndMail && comparePasswords && checkbox && !emailExist) {
        signupBtn.disabled = false;
    } else {
        signupBtn.disabled = true;
    }
}


function vaildateEmailAlreadyExist() {
    let inputField = document.getElementById('signup-mail');
    let warning = document.getElementById('signup-mail-already-exist');
    let flag = false;

    users.map((user) => {
        if (!flag) {
            warning.classList.add('v-hidden');

            if (validInput(inputField, user)) {
                warning.classList.remove('v-hidden');
                flag = true;
            }
        }
    })

    return flag;
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