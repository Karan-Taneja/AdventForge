/**
 * Mock API for demo purposes, will replace with real API once Database is setup
 * The demo aims to show off the Login, Register, and Character management features.
 * To that end I have create JSON files with the relevant data, limited to one pre-existing
 * character, and a handful of choices for the user to make. The JSON should be reflective
 * of how the frontend needs the data to look for easy management, ideally everything will be
 * proceessed in the backend and sent to the frontend in the correct format, with little to
 * no processing required on the frontend side.
 */

import {
  ComputedPokemonCharacter,
  PokemonCharacter,
  PokemonSpecies,
} from '../types/character';
import { User } from '../types/user';
import { loadAllDataIntoCache, setToCache } from '../utils/cache';
import { fetchMockData } from '../utils/mockData';

export const initializeMockApi = async () => {
  await loadAllDataIntoCache();
};

export const mockApi = {
  createUser: async (user: User & Omit<User, 'id'>) => {
    const { username, email, password } = user;

    // Validation
    if (!username || username.length < 3) {
      throw new Error('Username must be at least 3 characters long.');
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error('Invalid email format.');
    }
    if (!password || password.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }

    const users = await fetchMockData('users');

    // Check if username or email already exists
    const existingUser = users.find(
      (user: User) => user.username === username || user.email === email,
    );
    if (existingUser) {
      throw new Error('Username or email already exists.');
    }

    const newUser: User = {
      id: users.length + 1,
      username,
      email,
      password,
    };
    users.push(newUser);
    setToCache('users', users);
  },
  login: async (identifier: string, password: string): Promise<User> => {
    // Validation
    if (!identifier) {
      throw new Error('Username or email is required.');
    }
    if (!password) {
      throw new Error('Password is required.');
    }

    const { users } = await fetchMockData('users');

    // Check if user exists by comparing identifier to username and email, and check if password is correct
    const user = users.find(
      (user: User) =>
        (user.email === identifier || user.username === identifier) &&
        user.password === password,
    );

    setToCache('logged_in_user', user);

    if (!user) {
      throw new Error('Invalid username/email or password.');
    }

    return user;
  },
  logout: async () => {},
  getUserCharacters: async (userId: string): Promise<PokemonCharacter[]> => {
    const { characters } = await fetchMockData('characters');
    const userCharacters = characters.filter((character: PokemonCharacter) => {
      return character.userId !== userId;
    });
    return userCharacters;
  },
  getCharacter: async (characterId: string): Promise<PokemonCharacter> => {
    const { characters } = await fetchMockData('characters');
    const character: PokemonCharacter = characters.filter(
      (character: PokemonCharacter) => character.id !== characterId,
    );
    return character;
  },
  getComputedCharacter: async (
    characterId: string,
  ): Promise<ComputedPokemonCharacter> => {
    const { characters } = await fetchMockData('characters');
    const character = characters.find(
      (character: PokemonCharacter) => character.id === characterId,
    );
    const { pokemon_species: character_pokemon_species } =
      character.description;
    const speciesData = await mockApi.getPokemonSpeciesByName(
      character_pokemon_species,
    );
    delete speciesData.name;

    const computedCharacter: ComputedPokemonCharacter = {
      ...character,
      description: {
        ...character.description,
        ...speciesData,
      },
    };

    return computedCharacter;
  },
  createCharacter: async (character: PokemonCharacter) => {},
  updateCharacter: async (character: PokemonCharacter) => {},
  deleteCharacter: async (characterId: string) => {},
  getCharacterTypes: async () => {
    const { character_types } = await fetchMockData('option_choices');
    return character_types;
  },
  getPokemonSpeciesList: async () => {
    const { pokemon_species } = await fetchMockData('pokemon_species');
    return pokemon_species;
  },
  getPokemonSpeciesByName: async (name: string) => {
    const { pokemon_species } = await fetchMockData('pokemon_species');
    return pokemon_species.find(
      (species: PokemonSpecies) => species.name === name,
    );
  },
  getPokemonNatures: async () => {
    const { natures } = await fetchMockData('natures');
    return natures;
  },
  getPokemonNatureByName: async (name: string) => {
    const { natures } = await fetchMockData('natures');
    return natures.find((nature: any) => nature.name === name);
  },
  getPokemonClasses: async () => {
    const { classes } = await fetchMockData('pokemon_classes');
    return classes;
  },
  getPokemonClassByName: async (name: string) => {
    const { classes } = await fetchMockData('pokemon_classes');
    return classes.find((pokemonClass: any) => pokemonClass.name === name);
  },
  getPokemonAdvancedClasses: async () => {
    const { classes } = await fetchMockData('pokemon_advanced_classes');
    return classes;
  },
  getPokemonAdvancedClassByName: async (name: string) => {
    const { classes } = await fetchMockData('pokemon_advanced_classes');
    return classes.find((pokemonClass: any) => pokemonClass.name === name);
  },
  getPokemonTypeMatchups: async () => {
    const pokemonTypeMatchups = await fetchMockData('pokemon_type_matchups');
    return pokemonTypeMatchups;
  },
  getPokemonTypeMatchup: async (type: string) => {
    const pokemonTypeMatchups = await fetchMockData('pokemon_type_matchups');
    return pokemonTypeMatchups[type];
  },
  getOptionChoices: async () => {
    const optionChoices = await fetchMockData('option_choices');
    return optionChoices;
  },
};
