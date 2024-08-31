import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";


export async function getContacts(query){
    await fakeNetwork(`getContacts:${query}`);
    let contacts = await localforage.getItem('contacts');
    if(!contacts) contacts = [];
    if(query) {
        contacts = matchSorter(contacts, query, {keys: ['first', 'last']});
    }
    return contacts.sort(sortBy("last", "createdAt"));
}


export async function createContact() {
    await fakeNetwork();
    let id = Math.random().toString(36).substring(2, 9);
    let contact = {id, createdAt: Date.now()};
    let contacts = await getContacts(); 
    contacts.unshift(contact); // adds the new contact to the beginning of the contacts array.
    await set(contacts);
    return contact;
}

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