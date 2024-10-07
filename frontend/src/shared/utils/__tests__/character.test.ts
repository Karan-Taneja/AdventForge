import { describe, it, expect } from 'vitest';
import { getCharacterLevel } from '../character';
import { ComputedPokemonCharacter } from '@/shared/types/character';

describe('getCharacterLevel', () => {
  it('calculates level for a character with no advanced classes', () => {
    const character: any = {
      description: {
        class: {
          level: 5,
          advance_classes: [],
        },
      },
    } as ComputedPokemonCharacter;

    const level = getCharacterLevel(character);
    expect(level).toBe(5);
  });

  it('calculates level for a character with advanced classes', () => {
    const character: any = {
      description: {
        class: {
          level: 5,
          advance_classes: [{ level: 3 }, { level: 2 }],
        },
      },
    } as ComputedPokemonCharacter;

    const level = getCharacterLevel(character);
    expect(level).toBe(10); // 5 + 3 + 2
  });

  it('handles edge case with no levels', () => {
    const character: any = {
      description: {
        class: {
          level: 0,
          advance_classes: [],
        },
      },
    } as ComputedPokemonCharacter;

    const level = getCharacterLevel(character);
    expect(level).toBe(0);
  });

  it('handles edge case with empty advanced classes', () => {
    const character: any = {
      description: {
        class: {
          level: 5,
          advance_classes: [],
        },
      },
    } as ComputedPokemonCharacter;

    const level = getCharacterLevel(character);
    expect(level).toBe(5);
  });

  it('handles edge case with multiple advanced classes having zero levels', () => {
    const character: any = {
      description: {
        class: {
          level: 5,
          advance_classes: [{ level: 0 }, { level: 0 }],
        },
      },
    } as ComputedPokemonCharacter;

    const level = getCharacterLevel(character);
    expect(level).toBe(5); // 5 + 0 + 0
  });
});
