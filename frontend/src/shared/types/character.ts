type CharacterType = 'pokemon' | 'trainer';

type CharacterClass = {
  class_name: string;
  level: number;
  advance_classes: CharacterAdvanceClass[];
};

type CharacterAdvanceClass = {
  class_name: string;
  level: number;
};

type PokemonCharacterDescription = {
  pokemon_species: string;
  nature: string;
  class: CharacterClass;
  options_chosen: any[];
};

export type PokemonCharacter = {
  id: string;
  userId: string;
  name: string;
  character_type: CharacterType;
  description: PokemonCharacterDescription;
};

export type Nature = {
  name: string;
  increased: string;
  decreased: string;
};

type TypeMatchups = {
  double_damage_from: string[];
  half_damage_from: string[];
  no_damage_from: string[];
};

type BaseStats = {
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
};

type Passive = {
  name: string;
  description?: string;
  boosted_stats: string[];
};

type MoveFrequency = {
  quantity: number;
  duration: string;
};

type DamageDice = {
  quantity: number;
  sides: number;
};

type MoveDamage = {
  dice: DamageDice[];
};

type PokemonMove = {
  name: string;
  range: string;
  type: string;
  frequency: MoveFrequency;
  accuracy_check: string;
  damage: MoveDamage;
  description: string;
};

type PokemonModifiers = {
  attack: number;
  specialAttack: number;
  effect: number;
};

type PokemonSkill = {
  name: string;
  description: string;
};

export type PokemonSpecies = {
  name: string;
  type: string[];
  type_matchups: TypeMatchups;
  base_stats: BaseStats;
  passives: Passive[];
  modifiers: PokemonModifiers;
  moves: PokemonMove[];
  egg_groups: string[];
  hatch_rate: string;
  diet: string;
  size: string;
  weight: string;
  habitat: string[];
  proficiencies: string[];
  skills: PokemonSkill[];
  image: string;
};

type ComputedPokemonCharacterDescription = PokemonCharacterDescription &
  PokemonSpecies &
  Omit<PokemonSpecies, 'name'>;

export type ComputedPokemonCharacter = PokemonCharacter & {
  description: ComputedPokemonCharacterDescription;
};
