// https://vuejs.org/guide/scaling-up/state-management.html#simple-state-management-with-reactivity-api
import { reactive } from 'vue'

// Attrubuti particolari di utente
function createUtente(data) {
  return {
    nickname: data.profile.nickname,
    punti: data.profile.punti,
    puntiTot: data.profile.puntiTot
  }
}

// Attrubuti particolari di dipendente
function createDipendente(data) {
  return {
    isAdmin: data.profile.isAdmin
  }
}

// Utente Autenticato
const loggedUser = reactive({
    id: null,
    email: null,
    self: null,
    token: null,
    role: null,      // 'utente' | 'dipendente'
    profile: null    // dati specifici del tipo
});

function setLoggedUser (data) {
    loggedUser.id = data.id;
    loggedUser.email = data.email;
    loggedUser.self = data.self;
    loggedUser.token = data.token;
    loggedUser.role = data.role;

    if (data.role === 'utente') {
        loggedUser.profile = createUtente(data)
    } else if (data.role === 'dipendente') {
        loggedUser.profile = createDipendente(data)
    }
    console.log("Logged User: ", loggedUser);
}

function clearLoggedUser () {
    loggedUser.id = null;
    loggedUser.email = null;
    loggedUser.self = null;
    loggedUser.token = null;
    loggedUser.role = null;
    loggedUser.profile = null;
}


export { loggedUser, setLoggedUser, clearLoggedUser } 