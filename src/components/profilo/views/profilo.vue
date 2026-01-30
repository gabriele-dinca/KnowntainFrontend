<script setup>
  import vButton from '../../utils/vButton.vue'
  import { clearLoggedUser } from '../../../states/user'
  import { useRouter } from "vue-router"
  const router = useRouter()

  function logout() {
    clearLoggedUser();
    router.push("/login");
  }

  defineProps({
    user: Object
  });
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
      <p class="nickname">@{{ user.nickname }}</p>

      <vButton testo="Logout" :fn="logout" />
    </div>

    <div class="profilo-body">
      <div class="info">
        <span class="label">Punteggio</span>
        <span class="value">{{ user.punti }}</span>
        <span><img src="./images.jpeg" alt=""></span>
      </div>
    </div>
  </div>
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

  background-color: #007bff;
  color: white;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 28px;
  font-weight: 700;
}

.nome {
  margin: 0;
  font-size: 22px;
  font-weight: 600;
  color: #333;
}

.nickname {
  margin-top: 5px;
  font-size: 14px;
  color: #777;
}

/* BODY */
.profilo-body {
  border-top: 1px solid #eee;
  padding-top: 20px;
}

.info {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 12px 0;
}

.info img {
  padding-top: 10px;
  padding-left: 20px;
  width: 40px;
  height: auto;
}

.label {
  font-size: 14px;
  color: #666;
}

.value {
  padding-left: 20px;
  font-size: 16px;
  font-weight: 600;
  color: #007bff;
}

</style>