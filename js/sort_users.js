let alphabet = [
    { 'number': 0, 'letter': 'a' },
    { 'number': 1, 'letter': 'ä' },
    { 'number': 2, 'letter': 'b' },
    { 'number': 3, 'letter': 'c' },
    { 'number': 4, 'letter': 'd' },
    { 'number': 5, 'letter': 'e' },
    { 'number': 6, 'letter': 'f' },
    { 'number': 7, 'letter': 'g' },
    { 'number': 8, 'letter': 'h' },
    { 'number': 9, 'letter': 'i' },
    { 'number': 10, 'letter': 'j' },
    { 'number': 11, 'letter': 'k' },
    { 'number': 12, 'letter': 'l' },
    { 'number': 13, 'letter': 'm' },
    { 'number': 14, 'letter': 'n' },
    { 'number': 15, 'letter': 'o' },
    { 'number': 16, 'letter': 'ö' },
    { 'number': 17, 'letter': 'p' },
    { 'number': 18, 'letter': 'q' },
    { 'number': 19, 'letter': 'r' },
    { 'number': 20, 'letter': 's' },
    { 'number': 21, 'letter': 't' },
    { 'number': 22, 'letter': 'u' },
    { 'number': 23, 'letter': 'ü' },
    { 'number': 24, 'letter': 'v' },
    { 'number': 25, 'letter': 'w' },
    { 'number': 26, 'letter': 'x' },
    { 'number': 27, 'letter': 'y' },
    { 'number': 28, 'letter': 'z' },
    { 'number': 29, 'letter': '.' },
];

let usersAlphabet = [];

let user = {};

let currentIndexUsersAlphabet = 0;

let flag = '';


/**
 * This function starts the alphabetical sorting and goes through all objects in users.
 * @returns {(object|array)} usersAlphabet is the status from all current sortet users/contacts.
 * @returns {integer} currentIndexUsersAlphabet is the index number from the current added contact/contacts in alphabetUsers.
 */
function sortUsers() {
    usersAlphabet = [];

    users.map((user) => {
        currentIndexUsersAlphabet = 0;

        this.user = user;
        !usersAlphabet.length ? usersAlphabet.push(user) : loopUsersAlphabet(user);

        flag = '';
    })

    return [usersAlphabet, currentIndexUsersAlphabet];
}


/**
 * This function goes through all objects in usersAlphabet.
 * @param {object} user is the current user from users.
 */
function loopUsersAlphabet(user) {
    usersAlphabet.map((userAlphabet) => {
        if (flag == 'toSortUsers') {
            return;
        } else {
            flag = '';

            const userName = nameWithoutSpaces(user['name'].toLowerCase());
            const userAlphabetName = nameWithoutSpaces(userAlphabet['name'].toLowerCase());

            loopUserName(userName, userAlphabetName);

            currentIndexUsersAlphabet++;
        }
    })
}


/**
 * This function goes through all letters in userName.
 * @param {string} userName the current username from object user.
 * @param {string} userAlphabetName the current username from object userAlphabet.
 */
function loopUserName(userName, userAlphabetName) {
    for (let i = 0; i < userName.length; i++) {
        const userLetter = userName[i];

        loopUserAlphabetName(userLetter, userAlphabetName, i)

        if (flag) {
            break;
        }
    }
}


/**
 * This function goes through all letters in userAlphabetName.
 * @param {string} userLetter is the current letter from userName.
 * @param {string} userAlphabetName is the current userName from object userAlphabet.
 * @param {integer} i is the current index from the loop in loopUserName.
 */
function loopUserAlphabetName(userLetter, userAlphabetName, i) {
    const userAlphabetNameLength = userAlphabetName.length;

    for (let j = i; userAlphabetNameLength; j++) {
        const userAlphabetLetter = userAlphabetName[j];
        const userLetterNumber = returnLetterNumber(userLetter);
        const userAlphabetLetterNumber = returnLetterNumber(userAlphabetLetter);

        compareLetterNumbers(userLetterNumber, userAlphabetLetterNumber, i, userAlphabetNameLength);

        break;
    }
}


/**
 * This function compare the current letters from userName and userAlphabetName
 * and depending on the result, sorts the current user object into usersAlphabet.
 * @param {integer} userLetterNumber is the number from the letter out of userName out of the array alphabet.
 * @param {integer} userAlphabetLetterNumber is the number from the letter out of userAlphabetName out of the array alphabet. 
 * @param {integer} i is the current index from the loop in loopUserName.
 * @param {string} userAlphabetNameLength is the length from string userAlphabetName.
 */
function compareLetterNumbers(userLetterNumber, userAlphabetLetterNumber, i, userAlphabetNameLength) {
    if (userLetterNumber < userAlphabetLetterNumber) {
        usersAlphabet.splice(currentIndexUsersAlphabet, 0, this.user);
        flag = 'toSortUsers';
        currentIndexUsersAlphabet--;
    } else if (userLetterNumber > userAlphabetLetterNumber && currentIndexUsersAlphabet == usersAlphabet.length - 1) {
        usersAlphabet.splice(currentIndexUsersAlphabet + 1, 0, this.user);
        flag = 'toSortUsers';
    } else if (userLetterNumber > userAlphabetLetterNumber && currentIndexUsersAlphabet < usersAlphabet.length - 1) {
        flag = 'toLoopUsersAlphabet';
    } else if (userLetterNumber == userAlphabetLetterNumber && i == userAlphabetNameLength - 1) {
        usersAlphabet.splice(currentIndexUsersAlphabet + 1, 0, this.user);
        flag = 'toSortUsers';
    }
}


/**
 * This function splitet the input name and returns this name withouht space.
 * @param {string} name the name from the current user/contact
 * @returns {string} nameWithoutSpace is the input name without space.
 */
function nameWithoutSpaces(name) {
    let splitName = name.split(' ');
    let nameWithoutSpaces = '';

    for (let m = 0; m < splitName.length; m++) {
        nameWithoutSpaces += splitName[m];
    }

    return nameWithoutSpaces;
}


/**
 * This function returns the number from the letter which was assigned to the function.
 * @param {string} letter is the current letter from userName or userAlphabetName.
 * @returns {integer} the number from the letter out of alphabet.
 */
function returnLetterNumber(letter) {
    return alphabet.find((element) => element.letter == letter).number;
}