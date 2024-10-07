import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import Characters from '@/pages/Characters.vue';
import { mockApi } from '@/shared/mocks/api';
import { useRouter } from 'vue-router';
import { getFromCache } from '@/shared/utils/cache';

const mockPush = vi.fn();
// Mock the useRouter function
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock the API
vi.mock('@/shared/mocks/api', () => ({
  mockApi: {
    getUserCharacters: vi.fn(),
    getComputedCharacter: vi.fn(),
  },
}));

// Mock the cache utility
vi.mock('@/shared/utils/cache', () => ({
  getFromCache: vi.fn(),
}));

describe('Characters.vue', () => {
  const mockCharacters = [
    {
      id: '1',
      userId: '1',
      name: 'Pika',
      character_type: 'pokemon',
      description: {
        pokemon_species: 'Pikachu',
        class: {
          class_name: 'Pokemon',
          level: 5,
          advance_classes: [],
        },
        nature: 'Adamant',
        options_choices: [],
        image: 'image.jpg',
      },
    },
    {
      id: '2',
      userId: '1',
      name: 'Char',
      character_type: 'pokemon',
      description: {
        pokemon_species: 'Charmander',
        class: {
          class_name: 'Pokemon',
          level: 5,
          advance_classes: [],
        },
        nature: 'Adamant',
        options_choices: [],
        image: 'image.jpg',
      },
    },
  ];

  const mockComputedCharacters = [
    {
      id: '1',
      userId: '1',
      name: 'Pika',
      character_type: 'pokemon',
      description: {
        pokemon_species: 'Pikachu',
        type_matchups: {
          double_damage_from: [],
          half_damage_from: [],
          no_damage_from: [],
        },
        base_stats: {
          hp: 100,
          attack: 50,
          defense: 30,
          special_attack: 50,
          special_defense: 40,
          speed: 90,
        },
        passives: [],
        modifiers: {
          attack: 0,
          specialAttack: 0,
          effect: 0,
        },
        moves: [],
        egg_groups: [],
        hatch_rate: '10 days',
        diet: 'Omnivore',
        size: 'small',
        weight: 'small',
        habitat: [],
        proficiencies: [],
        skills: [],
        class: {
          class_name: 'Pokemon',
          level: 5,
          advance_classes: [],
        },
        nature: 'Adamant',
        options_choices: [],
        image: 'image.jpg',
      },
    },
    {
      id: '2',
      userId: '1',
      name: 'Char',
      character_type: 'pokemon',
      description: {
        pokemon_species: 'Charmander',
        type_matchups: {
          double_damage_from: [],
          half_damage_from: [],
          no_damage_from: [],
        },
        base_stats: {
          hp: 100,
          attack: 50,
          defense: 30,
          special_attack: 50,
          special_defense: 40,
          speed: 90,
        },
        passives: [],
        modifiers: {
          attack: 0,
          specialAttack: 0,
          effect: 0,
        },
        moves: [],
        egg_groups: [],
        hatch_rate: '10 days',
        diet: 'Omnivore',
        size: 'small',
        weight: 'small',
        habitat: [],
        proficiencies: [],
        skills: [],
        class: {
          class_name: 'Pokemon',
          level: 5,
          advance_classes: [],
        },
        nature: 'Adamant',
        options_choices: [],
        image: 'image.jpg',
      },
    },
  ];

  beforeEach(() => {
    (getFromCache as Mock).mockReturnValue({ id: 'user1' });
    (mockApi.getUserCharacters as Mock).mockResolvedValue(mockCharacters);
    (mockApi.getComputedCharacter as Mock).mockResolvedValueOnce(
      mockComputedCharacters[0],
    );
    (mockApi.getComputedCharacter as Mock).mockResolvedValueOnce(
      mockComputedCharacters[1],
    );
  });

  it('renders character data correctly', async () => {
    const wrapper = mount(Characters);
    await flushPromises(); // Wait for all promises to resolve

    expect(wrapper.text()).toContain('Characters (2)');
  });

  it('filters characters based on search query', async () => {
    const wrapper = mount(Characters);
    await flushPromises(); // Wait for all promises to resolve
    await wrapper.vm.$nextTick(); // Wait for the next DOM update

    (wrapper.vm as any).searchQuery = 'Pikachu'; // Update the searchQuery data property
    await wrapper.vm.$nextTick(); // Wait for the next DOM update

    expect(wrapper.text()).toContain('Characters (1)');
  });

  it('createCharacter logs "Create Character"', async () => {
    const wrapper = mount(Characters);
    await flushPromises(); // Wait for all promises to resolve
    await wrapper.vm.$nextTick(); // Wait for the next DOM update

    const createCharacterButton = wrapper.find('button'); // Select the button element
    const consoleSpy = vi.spyOn(console, 'log');

    createCharacterButton.trigger('click');
    expect(consoleSpy).toHaveBeenCalledWith('Create Character');
  });

  it('viewCharacter navigates to CharacterSheet', async () => {
    const wrapper = mount(Characters);
    await flushPromises(); // Wait for all promises to resolve

    const character = mockCharacters[0];
    wrapper
      .findComponent({ name: 'CharacterPreviewCard' })
      .vm.$emit('view', character);

    expect(mockPush).toHaveBeenCalledWith({
      name: 'CharacterSheet',
      params: { characterId: character.id },
    });
  });

  it('editCharacter logs "Edit Character" with character details', async () => {
    const wrapper = mount(Characters, {
      data() {
        return {
          isLoggedIn: true,
        };
      },
    });
    await flushPromises(); // Wait for all promises to resolve

    const character = mockCharacters[0];
    const characterPreviewCard = wrapper.findComponent({
      name: 'CharacterPreviewCard',
    });

    const consoleSpy = vi.spyOn(console, 'log');
    characterPreviewCard.vm.$emit('edit', character);
    await wrapper.vm.$nextTick(); // Wait for the next DOM update

    expect(consoleSpy).toHaveBeenCalledWith('Edit Character', character);
  });

  it('copyCharacter logs "Copy Character" with character details', async () => {
    const wrapper = mount(Characters, {
      data() {
        return {
          isLoggedIn: true,
        };
      },
    });
    await flushPromises(); // Wait for all promises to resolve

    const character = mockCharacters[0];
    const characterPreviewCard = wrapper.findComponent({
      name: 'CharacterPreviewCard',
    });

    const consoleSpy = vi.spyOn(console, 'log');
    characterPreviewCard.vm.$emit('copy', character);
    await wrapper.vm.$nextTick(); // Wait for the next DOM update

    expect(consoleSpy).toHaveBeenCalledWith('Copy Character', character);
  });

  it('deleteCharacter logs "Delete Character" with character details', async () => {
    const wrapper = mount(Characters, {
      data() {
        return {
          isLoggedIn: true,
        };
      },
    });
    await flushPromises(); // Wait for all promises to resolve

    const character = mockCharacters[0];
    const characterPreviewCard = wrapper.findComponent({
      name: 'CharacterPreviewCard',
    });

    if (!characterPreviewCard.exists()) {
      console.log(wrapper.html()); // Log the HTML of the wrapper for debugging
      throw new Error('CharacterPreviewCard component not found');
    }

    const consoleSpy = vi.spyOn(console, 'log');
    characterPreviewCard.vm.$emit('delete', character);
    await wrapper.vm.$nextTick(); // Wait for the next DOM update

    expect(consoleSpy).toHaveBeenCalledWith('Delete Character', character);
  });

  it('redirects to Auth page if not logged in', async () => {
    (getFromCache as Mock).mockReturnValue(null);
    const wrapper = mount(Characters, {
      data() {
        return {
          isLoggedIn: false,
        };
      },
    });
    await flushPromises(); // Wait for all promises to resolve
    await wrapper.vm.$nextTick(); // Wait for the next DOM update

    expect(mockPush).toHaveBeenCalledWith('/auth');
  });
});
