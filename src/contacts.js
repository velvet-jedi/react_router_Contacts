const localforage = require("localforage");


export async function getContact(id) {
    await fakeNetwork(`contact:${id}`);
    let contacts = await localforage.getItem('contacts');
    let contact = contacts.find( contact =>  contact.id === id);
    return contact ?? null;
}

export async function updateContact(id, updates){
    await fakeNetwork();
    let contacts = await localforage.getItem('contacts');
    let contact = contacts.find(contact => contact.id === id);
    if (!contact) throw new Error('No contact found for id', id);
    Object.assign(contact, updates);
    await set(contacts);
    return contact;
}

export async function deleteContact(id) {
    let contacts = await localforage.getItem('contacts');
    let index = contacts.findIndex(contact => contact.id === id);
    if(index > -1) {
        contacts.splice(index, 1); // delete the contact
        await set(contacts);
        return true;
    }
    return false;
}

function set(contacts) {
    return localforage.setItem("contacts", contacts);
}

let fakeCache = {}; //An object to store the cache.

async function fakeNetwork(key) { // An async function that simulates a network request
    if(!key) {
        fakeCache = {}; // If no key is provided, clear the cache.
    }
    if(fakeCache[key]) { // If the key exists in the cache, return immediately.
        return;
    }
    fakeCache[key] = true; // If the key is not in cache, add the key to the cache and return a promise that resolves after a random delay (up to 800 milliseconds).
    return new Promise(res => {
        setTimeout(res, Math.random() * 800);
    });
}