import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import CharacterSheet from '@/pages/CharacterSheet.vue';
import { mockApi } from '@/shared/mocks/api';
import { useRoute } from 'vue-router';

// Mock the useRoute function
vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
}));

// Mock the API
vi.mock('@/shared/mocks/api', () => ({
  mockApi: {
    getComputedCharacter: vi.fn(),
  },
}));

describe('CharacterSheet.vue', () => {
  const mockCharacter = {
    name: 'Test Character',
    description: {
      base_stats: {
        hp: 100,
      },
    },
  };

  beforeEach(() => {
    (useRoute as Mock).mockReturnValue({
      params: { characterId: '1' },
    });
    (mockApi.getComputedCharacter as Mock).mockResolvedValue(mockCharacter);
  });

  it('renders character data correctly', async () => {
    const wrapper = mount(CharacterSheet);
    await wrapper.vm.$nextTick(); // Wait for onMounted to be called
    await wrapper.vm.$nextTick(); // Wait for the next DOM update

    expect(wrapper.text()).toContain('Test Character');
    expect(wrapper.text()).toContain('Current HP: 100');
    expect(wrapper.text()).toContain('Max HP: 100');
    expect(wrapper.text()).toContain('Temp HP: 0');
  });

  it('heals the character correctly', async () => {
    const wrapper = mount(CharacterSheet);
    await wrapper.vm.$nextTick(); // Wait for onMounted to be called
    await wrapper.vm.$nextTick(); // Wait for the next DOM update

    await wrapper.find('input').setValue(10);
    await wrapper.find('button').trigger('click'); // Heal button

    expect(wrapper.text()).toContain('Current HP: 100'); // Should not exceed max HP
  });

  it('damages the character correctly', async () => {
    const wrapper = mount(CharacterSheet);
    await wrapper.vm.$nextTick(); // Wait for onMounted to be called
    await wrapper.vm.$nextTick(); // Wait for the next DOM update

    await wrapper.find('input').setValue(10);
    await wrapper.findAll('button').at(1).trigger('click'); // Damage button

    expect(wrapper.text()).toContain('Current HP: 90');
  });

  it('shows loading message when character data is not yet loaded', () => {
    (mockApi.getComputedCharacter as Mock).mockResolvedValueOnce(null);
    const wrapper = mount(CharacterSheet);

    expect(wrapper.text()).toContain('Loading character data...');
  });
});
