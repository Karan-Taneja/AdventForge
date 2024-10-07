<template>
  <div class="character-card bg-white shadow-md rounded-lg p-4 flex">
    <img
      :src="character.description.image"
      alt="Character Image"
      class="w-16 h-16 object-cover rounded mr-4"
    />
    <div class="flex-1">
      <h2 class="text-xl font-bold">{{ character.name }}</h2>
      <p class="text-gray-600">Level: {{ characterLevel }}</p>
      <p class="text-gray-600">Type: {{ character.character_type }}</p>
      <p class="text-gray-600">
        Class: {{ character.description.class.class_name }}
      </p>
      <div class="mt-4 flex justify-between flex-wrap">
        <button @click="viewCharacter" class="btn btn-view">View</button>
        <button @click="editCharacter" class="btn btn-edit">Edit</button>
        <button @click="copyCharacter" class="btn btn-copy">Copy</button>
        <button @click="deleteCharacter" class="btn btn-delete">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getCharacterLevel } from '../shared/utils/character';

export default {
  name: 'CharacterPreviewCard',
  props: {
    character: {
      type: Object,
      required: true,
      default: () => ({
        image: '',
        name: '',
        level: '',
        character_type: '',
        description: {
          class: {
            class_name: '',
          },
        },
      }),
    },
  },
  computed: {
    characterLevel() {
      return getCharacterLevel(this.character);
    },
  },
  methods: {
    viewCharacter() {
      this.$emit('view', this.character);
    },
    editCharacter() {
      this.$emit('edit', this.character);
    },
    copyCharacter() {
      this.$emit('copy', this.character);
    },
    deleteCharacter() {
      this.$emit('delete', this.character);
    },
  },
};
</script>

<style scoped>
.character-card {
  max-width: 300px;
}

img {
  width: 64px; /* 16 units */
  height: 64px; /* 16 units */
  border-radius: 8px;
  margin-right: 16px;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  margin: 0.25rem 0; /* Add margin to buttons to prevent overlap */
}

.btn-view {
  background-color: #3490dc;
  color: white;
}

.btn-edit {
  background-color: #38c172;
  color: white;
}

.btn-copy {
  background-color: #ffed4a;
  color: black;
}

.btn-delete {
  background-color: #e3342f;
  color: white;
}
</style>
