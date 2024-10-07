import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import CharacterPreviewCard from '@/components/CharacterPreviewCard.vue';
import { getCharacterLevel } from '@/shared/utils/character';

vi.mock('@/shared/utils/character', () => ({
  getCharacterLevel: vi.fn(),
}));

describe('CharacterPreviewCard.vue', () => {
  let wrapper;
  const character = {
    name: 'John Doe',
    character_type: 'Warrior',
    description: {
      image: 'path/to/image.jpg',
      class: {
        class_name: 'Knight',
      },
    },
  };

  beforeEach(() => {
    (getCharacterLevel as Mock).mockReturnValue(10);
    wrapper = shallowMount(CharacterPreviewCard, {
      props: { character },
    });
  });

  it('renders character details correctly', () => {
    const paragraphs = wrapper.findAll('p');
    expect(paragraphs.at(0).text()).toContain('Level: 10');
    expect(paragraphs.at(1).text()).toContain(
      `Type: ${character.character_type}`,
    );
    expect(paragraphs.at(2).text()).toContain(
      `Class: ${character.description.class.class_name}`,
    );
  });

  it('calls viewCharacter method when View button is clicked', async () => {
    const viewCharacterSpy = vi.spyOn(wrapper.vm, 'viewCharacter');
    await wrapper.find('.btn-view').trigger('click');
    expect(viewCharacterSpy).toHaveBeenCalled();
  });

  it('calls editCharacter method when Edit button is clicked', async () => {
    const editCharacterSpy = vi.spyOn(wrapper.vm, 'editCharacter');
    await wrapper.find('.btn-edit').trigger('click');
    expect(editCharacterSpy).toHaveBeenCalled();
  });

  it('calls copyCharacter method when Copy button is clicked', async () => {
    const copyCharacterSpy = vi.spyOn(wrapper.vm, 'copyCharacter');
    await wrapper.find('.btn-copy').trigger('click');
    expect(copyCharacterSpy).toHaveBeenCalled();
  });

  it('calls deleteCharacter method when Delete button is clicked', async () => {
    const deleteCharacterSpy = vi.spyOn(wrapper.vm, 'deleteCharacter');
    await wrapper.find('.btn-delete').trigger('click');
    expect(deleteCharacterSpy).toHaveBeenCalled();
  });
});
