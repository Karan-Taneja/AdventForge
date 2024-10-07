<template>
  <div v-if="character">
    <h1>{{ character.name }}</h1>
    <p>Current HP: {{ currentHp }}</p>
    <p>Max HP: {{ maxHp }}</p>
    <p>Temp HP: {{ tempHp }}</p>
    <input v-model="hpChange" type="number" placeholder="HP Change" />
    <button @click="heal">Heal</button>
    <button @click="damage">Damage</button>
  </div>
  <div v-else>
    <p>Loading character data...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { mockApi } from '../shared/mocks/api';

const route = useRoute();
const characterId = route.params.characterId as string;

const character = ref(null);
const hpChange = ref(0);
const currentHp = ref(0);
const maxHp = ref(0);
const tempHp = ref(0);

const fetchCharacterData = async () => {
  try {
    const fetchedCharacter = await mockApi.getComputedCharacter(characterId);
    character.value = fetchedCharacter;
    currentHp.value = fetchedCharacter.description.base_stats.hp;
    maxHp.value = fetchedCharacter.description.base_stats.hp;
    tempHp.value = 0;
  } catch (error) {
    console.error('Error fetching character data:', error);
  }
};

const heal = () => {
  currentHp.value = Math.min(
    currentHp.value + Number(hpChange.value),
    maxHp.value,
  );
  hpChange.value = 0;
};

const damage = () => {
  currentHp.value = Math.max(currentHp.value - Number(hpChange.value), 0);
  hpChange.value = 0;
};

onMounted(() => {
  fetchCharacterData();
});
</script>
