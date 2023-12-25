import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

const BaseStatsSchema = new mongoose.Schema(
  {
    hp: Number,
    attack: Number,
    defense: Number,
    special_attack: Number,
    special_defense: Number,
    speed: Number,
  },
  { _id: false },
);

const GenderRatioSchema = new mongoose.Schema(
  {
    male: Number,
    female: Number,
  },
  { _id: false },
);
const EvolutionSchema = new mongoose.Schema(
  {
    pre_evolved_from: String,
    evolves_into: String || [String] || null,
  },
  { _id: false },
);

@Schema({ timestamps: true, _id: false })
export class Pokemon {
  @Prop()
  id: number;
  @Prop()
  name: string;
  @Prop()
  type: string;
  @Prop()
  description: string;
  @Prop()
  abilities: string[];
  @Prop()
  height: string;
  @Prop()
  weight: string;
  @Prop({ type: GenderRatioSchema })
  gender_ratio: { male: number; female: number };
  @Prop({ type: EvolutionSchema })
  evolution: {
    pre_evolved_from: string;
    evolves_into: string | string[] | null;
  };
  @Prop({ type: BaseStatsSchema })
  base_stats: {
    hp: number;
    attack: number;
    defense: number;
    special_attack: number;
    special_defense: number;
    speed: number;
  };
  @Prop()
  image: string;
  @Prop()
  price: string;
  @Prop()
  availability: string;
  @Prop()
  gen: string;
}

export class Pokemons {
  @Prop({ type: { pokemon: [Pokemon] } })
  pokemons: [Pokemon];
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
