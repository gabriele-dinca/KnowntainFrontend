<script setup>
import { computed } from 'vue'

const props = defineProps({
  titolo: {
    type: String,
    required: true,
  },
  descrizione: {
    type: String,
    required: true,
  },
  puntiAttuali: {
    type: Number,
    required: true,
  },
  puntiTotali: {
    type: Number,
    required: true,
  },
})

const percentuale = computed(() => {
  if (props.puntiTotali === 0) return 0
  return Math.min(100, Math.round((props.puntiAttuali / props.puntiTotali) * 100))
})
</script>

<template>
  <article class="iniziativa-card">
    <header>
      <h3>{{ titolo }}</h3>
    </header>

    <p class="descrizione">{{ descrizione }}</p>

    <div class="progress">
      <div class="progress-info">
        <span>{{ puntiAttuali }} / {{ puntiTotali }} punti</span>
        <span>{{ percentuale }}%</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: percentuale + '%' }" />
      </div>
    </div>
  </article>
</template>

<style scoped>
.iniziativa-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 50px;
}

h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.descrizione {
  font-size: 0.95rem;
  color: #555;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 0.4rem;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 999px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #16a34a, #22c55e);
  transition: width 0.3s ease;
}
</style>