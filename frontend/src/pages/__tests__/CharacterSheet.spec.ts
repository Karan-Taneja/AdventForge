import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import CharacterSheet from '@/pages/CharacterSheet.vue';
import { mockApi } from '@/shared/mocks/api';

// Mock the API module
vi.mock('@/shared/mocks/api', () => ({
  mockApi: {
    getComputedCharacter: vi.fn(),
  },
}));

describe('CharacterSheet.vue', () => {
  let wrapper;

  beforeEach(async () => {
    // Type assertion to let TypeScript know that getCharacter is a mock function
    const getComputedCharacterMock = mockApi.getComputedCharacter as ReturnType<
      typeof vi.fn
    >;

    // Use mockResolvedValue to mock the resolved value of the promise
    getComputedCharacterMock.mockResolvedValue({
      id: '1',
      description: {
        image: 'character.jpg',
        base_stats: {
          attack: 10,
          defense: 8,
          specialAttack: 12,
          specialDefense: 9,
          speed: 7,
          hp: 15,
        },
      },
    });

    wrapper = mount(CharacterSheet, {
      props: {
        characterId: '1',
      },
    });

    await wrapper.vm.$nextTick(); // Wait for the next DOM update cycle
  });

  it('renders character image', () => {
    const img = wrapper.find('.character-image');
    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toBe('character.jpg');
  });

  it('renders character stats', () => {
    const stats = wrapper.findAll('.stat');
    expect(stats.length).toBe(6);
    expect(stats.at(0).text()).toContain('attack: 10');
    expect(stats.at(1).text()).toContain('defense: 8');
    expect(stats.at(2).text()).toContain('specialAttack: 12');
    expect(stats.at(3).text()).toContain('specialDefense: 9');
    expect(stats.at(4).text()).toContain('speed: 7');
    expect(stats.at(5).text()).toContain('hp: 15');
  });

  it('renders HP section', () => {
    const hpInfo = wrapper.find('.hp-info');
    expect(hpInfo.exists()).toBe(true);
    expect(hpInfo.text()).toContain('15 / 15');
    expect(hpInfo.text()).toContain('Temp: 0');
  });

  it('handles heal and damage actions', async () => {
    wrapper.setData({ hpChange: 5 });

    // Heal action
    await wrapper.find('.btn-heal').trigger('click');
    expect(wrapper.vm.currentHp).toBe(15); // Max HP is 15

    // Damage action
    wrapper.setData({ hpChange: 3 });
    await wrapper.find('.btn-damage').trigger('click');
    expect(wrapper.vm.currentHp).toBe(12);
  });
});
