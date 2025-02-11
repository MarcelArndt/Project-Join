
let STORAGE_URL = "https://project-join-8f484-default-rtdb.firebaseio.com/";

// Allgemeine Funktionen

async function setItem(path = "", value = "") {
    let url = STORAGE_URL + path + ".json";
    let response = await fetch(url, {
        method: 'PUT', // 'PUT' überschreibt die bestehenden Daten
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(value)
    });
    return await response.json();
}

async function getItem(path = "") {
    let url = STORAGE_URL + path + ".json";
    let response = await fetch(url);
    return await response.json(); // Gibt die JSON-Daten direkt zurück
}

// Daten speichern

async function storeTasks() {
    let tasksAsText = JSON.stringify(tasks); // Optional, falls nötig
    await setItem('tasks', tasksAsText);
}

async function storeContacts() {
    let contactsAsText = JSON.stringify(contacts); // Optional, falls nötig
    await setItem('contacts', contactsAsText);
}

async function storeUser() {
    let usersAsText = JSON.stringify(users); // Optional, falls nötig
    await setItem('users', usersAsText);
}

async function storeActualUser() {
    let actualUserAsText = JSON.stringify(actualUser);
    await setItem('actualUser', actualUserAsText);
}

async function storeRememberMe() {
    let rememberMeAsText = JSON.stringify(rememberMe);
    await setItem('rememberMe', rememberMeAsText);
}

// Daten laden

async function loadTasks() {
    let loadedTasks = await getItem('tasks');
    if (loadedTasks) {
        tasks = JSON.parse(loadedTasks); // Falls die Daten als String gespeichert sind
    }
}

async function loadContacts() {
    let loadedContacts = await getItem('contacts');
    if (loadedContacts) {
        contacts = JSON.parse(loadedContacts);
    }
}

async function loadUsers() {
    let loadedUsers = await getItem('users');
    if (loadedUsers) {
        users = JSON.parse(loadedUsers);
    }
}

async function loadActualUser() {
    let loadedActualUser = await getItem('actualUser');
    if (loadedActualUser) {
        actualUser = JSON.parse(loadedActualUser);
    }
}

async function loadRememberMe() {
    let loadedRememberMe = await getItem('rememberMe');
    if (loadedRememberMe) {
        rememberMe = JSON.parse(loadedRememberMe);
    }
}

// Daten löschen

async function deleteStoredTasks() {
    await setItem('tasks', null); // Löscht die Tasks in der Firebase-Datenbank
}

async function deleteStoredUsers() {
    await setItem('users', null);
}

async function deleteStoredContacts() {
    await setItem('contacts', null);
}

async function deleteActualUser() {
    await setItem('actualUser', null);
}

async function deleteRememberMe() {
    await setItem('rememberMe', null);
}

// Beispiel für die Nutzung
// await storeTasks(); // Speichert `tasks`
// await loadTasks();  // Lädt `tasks`
// await deleteStoredTasks(); // Löscht `tasks`
