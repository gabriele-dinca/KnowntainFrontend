// https://vuejs.org/guide/scaling-up/state-management.html#simple-state-management-with-reactivity-api
import { reactive } from 'vue'

// Attrubuti particolari di utente
function createUtente(data) {
  return {
    nickname: data.nickname,
    punti: data.punti,
    puntiTot: data.puntiTot
  }
}

// Attrubuti particolari di dipendente
function createDipendente(data) {
  return {
    isAdmin: data.isAdmin
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