import { ComputedPokemonCharacter } from '../types/character';

export const getCharacterLevel = (character: ComputedPokemonCharacter) => {
  const characterClass = character.description.class;
  let level = characterClass.level;
  characterClass.advance_classes.forEach(advanceClass => {
    level += advanceClass.level;
  });
  return level;
};
