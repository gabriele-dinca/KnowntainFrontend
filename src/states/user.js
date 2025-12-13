// https://vuejs.org/guide/scaling-up/state-management.html#simple-state-management-with-reactivity-api
import { reactive } from 'vue'

const loggedUser = reactive({
    token: undefined,
    nome: undefined,
    isDipendente: undefined,
})

function setLoggedUser (data) {
    loggedUser.token = data.token;
    loggedUser.nome = data.nome;
    loggedUser.isDipendente = data.isDipendente;
}

function clearLoggedUser () {
    loggedUser.token = undefined;
    loggedUser.nome = undefined;
    loggedUser.isDipendente = undefined;
}

export { loggedUser, setLoggedUser, clearLoggedUser } 