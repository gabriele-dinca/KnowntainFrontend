<script setup>
    import CreaDipendente from '../utils/creaDipendente.vue';
    import vButton from '../../utils/vButton.vue'
    import { clearLoggedUser, loggedUser } from '../../../states/user'
    import { useRouter } from "vue-router"
    const router = useRouter()

    function logout() {
    clearLoggedUser();
    router.push("/login");
    }

    defineProps({ user: Object });
</script>

<template>
  <div class="profilo">
        <div class="profilo-header">
            <div class="avatar">
            {{ user.nome.charAt(0) }}{{ user.cognome.charAt(0) }}
            </div>
            <h2 class="nome">
            {{ user.nome }} {{ user.cognome }}
            </h2>

            <vButton testo="Logout" :fn="logout" />
        </div>


        <div class="info">
            <p class="email">{{ user.email }}</p>
        </div>
    </div>

    <CreaDipendente v-if="user.isAdmin === true" />

</template>

<style scoped>
.profilo {
  max-width: 420px;
  /*margin: 60px;*/
  padding: 30px;

  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);

  font-family: inherit;
}

/* HEADER */
.profilo-header {
  text-align: center;
  margin-bottom: 25px;
}

.avatar {
  width: 80px;
  height: 80px;
  margin: 0 auto 15px;

  background-color: var(--knt-blue);
  color: white;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 28px;
  font-weight: 700;
}

.nome {
  margin-bottom: 30px;
  font-size: 22px;
  font-weight: 600;
  color: #333;
}

.email {
  margin-top: 5px;
  font-size: 14px;
  color: #777;
  text-align: center;
}

</style>