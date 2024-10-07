<template>
  <div v-if="isLoggedIn">
    <div class="p-4">
      <div class="max-w-7xl mx-auto">
        <div class="flex justify-between items-center mb-4">
          <h1 class="text-2xl font-bold">
            Characters ({{ filteredCharacters.length }})
          </h1>
          <button
            @click="createCharacter"
            class="py-2 px-4 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700"
          >
            Create Character
          </button>
        </div>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search characters..."
          class="w-full p-2 mb-4 border border-gray-300 rounded-md"
        />
        <div class="character-list">
          <CharacterPreviewCard
            v-for="character in filteredCharacters"
            :key="character.id"
            :character="character"
            @view="viewCharacter"
            @edit="editCharacter"
            @copy="copyCharacter"
            @delete="deleteCharacter"
          />
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>You are not logged in. Redirecting to login page...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { mockApi } from '../shared/mocks/api';
import {
  ComputedPokemonCharacter,
  PokemonCharacter,
} from '../shared/types/character';
import CharacterPreviewCard from '../components/CharacterPreviewCard.vue';
import { getFromCache } from '../shared/utils/cache';

const router = useRouter();
const user = getFromCache('logged_in_user');
const isLoggedIn = ref(!!user);
const characters = ref<ComputedPokemonCharacter[]>([]);
const searchQuery = ref('');

const fetchCharacters = async () => {
  const userCharacters = await mockApi.getUserCharacters(String(user.id));
  const computedUserCharacters = await Promise.all(
    userCharacters.map(async (character: PokemonCharacter) => {
      const computedCharacter = await mockApi.getComputedCharacter(
        character.id,
      );
      return computedCharacter;
    }),
  );
  characters.value = computedUserCharacters;
};

onMounted(() => {
  if (!isLoggedIn.value) {
    router.push('/auth');
  } else {
    fetchCharacters();
  }
});

const filteredCharacters = computed(() => {
  return characters.value.filter((character: ComputedPokemonCharacter) => {
    return (
      character.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      character.description.class.level
        .toString()
        .includes(searchQuery.value) ||
      character.description.class.class_name
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase()) ||
      character.character_type
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase()) ||
      character.description.pokemon_species
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase())
    );
  });
});

const createCharacter = () => {
  // Logic to create a new character
  console.log('Create Character');
};

const viewCharacter = (character: ComputedPokemonCharacter) => {
  router.push({
    name: 'CharacterSheet',
    params: { characterId: character.id },
  });
};

const editCharacter = (character: ComputedPokemonCharacter) => {
  // Logic to edit a character
  console.log('Edit Character', character);
};

const copyCharacter = (character: ComputedPokemonCharacter) => {
  // Logic to copy a character
  console.log('Copy Character', character);
};

const deleteCharacter = (character: ComputedPokemonCharacter) => {
  // Logic to delete a character
  console.log('Delete Character', character);
};
</script>
