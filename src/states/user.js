// https://vuejs.org/guide/scaling-up/state-management.html#simple-state-management-with-reactivity-api
import { reactive } from 'vue'

const loggedUser = reactive({
    id: undefined,
    email: undefined,
    self: undefined,
    token: undefined,
    role: undefined
})

function setLoggedUser (data) {
    loggedUser.id = data.id;
    loggedUser.email = data.email;
    loggedUser.self = data.self;
    loggedUser.token = data.token;
    loggedUser.role = data.role;
    //console.log("Logged User", loggedUser);
}

function clearLoggedUser () {
    loggedUser.id = undefined;
    loggedUser.email = undefined;
    loggedUser.self = undefined;
    loggedUser.token = undefined;
    loggedUser.role = undefined;
}

export { loggedUser, setLoggedUser, clearLoggedUser } 