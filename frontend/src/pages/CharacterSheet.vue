<template>
  <div class="character-detail" v-if="character">
    <div class="header">
      <img
        :src="character.description.image"
        alt="Character Image"
        class="character-image"
      />
      <div class="rest-buttons">
        <button @click="shortRest" class="btn btn-short-rest">
          Short Rest
        </button>
        <button @click="longRest" class="btn btn-long-rest">Long Rest</button>
      </div>
    </div>
    <div class="stats">
      <div
        class="stat"
        v-for="[name, value] in Object.entries(
          character.description.base_stats,
        )"
        :key="name"
      >
        <span>{{ name }}: {{ value }}</span>
      </div>
    </div>
    <div class="hp-section">
      <div class="hp-controls">
        <button @click="heal" class="btn btn-heal">Heal</button>
        <input type="number" v-model="hpChange" class="hp-input" />
        <button @click="damage" class="btn btn-damage">Damage</button>
      </div>
      <div class="hp-info">
        <span>{{ currentHp }} / {{ maxHp }}</span>
        <span>Temp: {{ tempHp }}</span>
      </div>
    </div>
  </div>
  <div v-else>Loading character data...</div>
</template>

<script>
import { mockApi } from '../shared/mocks/api'; // Ensure you have an API module to fetch character data

export default {
  name: 'CharacterSheet',
  props: {
    characterId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      character: null,
      hpChange: 0,
      currentHp: 0,
      maxHp: 0,
      tempHp: 0,
    };
  },
  mounted() {
    this.fetchCharacterData();
  },
  methods: {
    async fetchCharacterData() {
      try {
        const character = await mockApi.getComputedCharacter(this.characterId);
        this.character = character;
        this.currentHp = character.description.base_stats.hp;
        this.maxHp = character.description.base_stats.hp;
        this.tempHp = 0;
      } catch (error) {
        console.error('Error fetching character data:', error);
      }
    },
    heal() {
      this.currentHp = Math.min(
        this.currentHp + parseInt(this.hpChange),
        this.maxHp,
      );
      this.hpChange = 0;
    },
    damage() {
      this.currentHp = Math.max(this.currentHp - parseInt(this.hpChange), 0);
      this.hpChange = 0;
    },
  },
};
</script>

<style scoped>
.character-detail {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  max-width: 600px;
  margin: auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.character-image {
  width: 64px;
  height: 64px;
  border-radius: 8px;
}

.rest-buttons .btn {
  margin-left: 0.5rem;
}

.stats {
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.stat {
  flex: 1 1 30%;
  margin: 0.5rem 0;
}

.hp-section {
  margin-top: 1rem;
}

.hp-controls {
  display: flex;
  align-items: center;
}

.hp-input {
  width: 50px;
  margin: 0 0.5rem;
}

.hp-info {
  margin-top: 0.5rem;
}
</style>
