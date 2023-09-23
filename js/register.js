let users = [];


/**
 * Pulling user data from backend server.
 */
async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}


/**
 * This function is registering a user on signup and saves the data to backend.
 */
async function register() {
    const registerBtn = document.getElementById('btn_signUpUser');
    const username = document.getElementById('username');
    const usermail = document.getElementById('email');
    const password = document.getElementById('inputPassword2');
    const passwordConfirm = document.getElementById('inputPassword3');

    registerBtn.disabled = true;
    users.push({
        name: username.value,
        email: usermail.value,
        password: password.value,
        phone: ""
    });

    [users, currentContactIndex] = sortUsers();

    await setItem('users', JSON.stringify(users));
    resetForm(username, usermail, password, passwordConfirm, registerBtn);
    successMessage('You signed up successfully');
    loadHTML('formElement', "login.html");
}


/**
 * This function clears the Signup form.
 * @param {*} username 
 * @param {*} usermail 
 * @param {*} password 
 * @param {*} passwordConfirm 
 * @param {*} registerBtn 
 */
function resetForm(username, usermail, password, passwordConfirm, registerBtn) {
    username.value = "";
    usermail.value = "";
    password.value = "";
    passwordConfirm.value = "";
    registerBtn.disabled = false;
}
