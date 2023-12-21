const STORAGE_TOKEN = 'CCZ1CKDKPWUP8F0YWRP31VEE8ZNX67XFR2D5XYOS';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

/**
 * This function save data in the backend with the STORAGE_TOKEN and the STORAGE_URL
 * @param {string} key is the key to accsess to the value 
 * @param {string} value is the value to be saved
 * @returns The payload (header)
 */
async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json());
}


/**
 * This function returns the data from the backend with the STORAGE_TOKEN and the STORAGE_URL
 * @param {string} key is the key to accsess to the value
 * @returns The a objectlist with the data
 */
async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) {
            return res.data.value;
        } throw `Could not find data with key "${key}".`;
    });
}