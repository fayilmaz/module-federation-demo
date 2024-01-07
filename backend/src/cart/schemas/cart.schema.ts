import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

const CartItemSchema = new mongoose.Schema({
  _id: ObjectId,
  cartItemId: String,
  pokemonId: Number,
  name: String,
  price: Number,
  totalPrice: Number,
  quantity: Number,
});

@Schema({ timestamps: true })
export class Cart {
  @Prop({ required: true })
  userId: string;
  @Prop({ required: true, unique: true, type: [CartItemSchema], default: [] })
  cartItems: (typeof CartItemSchema)[];
  @Prop({ required: true })
  cartTotal: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
