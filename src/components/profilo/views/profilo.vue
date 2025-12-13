<script setup>

    const test = {
        nome: 'Mario',
        cognome: 'Rossi',
        nickname: 'Supermario',
        score: 300
    }
</script>

<template>
  <div class="profilo">
    <div class="profilo-header">
      <div class="avatar">
        {{ test.nome.charAt(0) }}{{ test.cognome.charAt(0) }}
      </div>
      <h2 class="nome">
        {{ test.nome }} {{ test.cognome }}
      </h2>
      <p class="nickname">@{{ test.nickname }}</p>
    </div>

    <div class="profilo-body">
      <div class="info">
        <span class="label">Punteggio</span>
        <span class="value">{{ test.score }} punti</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profilo {
  max-width: 420px;
  margin: 80px auto;
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

.label {
  font-size: 14px;
  color: #666;
}

.value {
  font-size: 16px;
  font-weight: 600;
  color: #007bff;
}

</style>