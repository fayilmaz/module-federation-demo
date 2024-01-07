import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemons/schemas/pokemons.schema';
import * as mongoose from 'mongoose';
import { AddToCartReqDto } from './dto/add-to-cart-req-dto';
import { Cart } from './schemas/cart.schema';
import { MessageService } from 'src/message/message.service';
import { MessageKeys } from 'src/message/messageKeysEnum';
import { RemoveWithQuantityDto } from './dto/remove-with-quantity-dto';
import { AddToCartResDto } from './dto/add-to-cart-res-dto';
import { BaseErrorResponseDto } from 'commonDto/base-error-response-dto';
import { GetCartDetailsResDto } from './dto/get-card-details-res-dto';
import { RemoveWithQuantityResDto } from './dto/remove-with-quantity-res-dto';
import { DeleteFromCartResDto } from './dto/delete-from-cart-res-dto';
import { DeleteFromCartDto } from './dto/delete-from-cart-dto';

export interface ICartItem {
  _id?: string;
  pokemonId: number;
  name: string;
  price: number;
  quantity: number;
}

export interface ICartItemMongo extends ICartItem {
  _id: string;
}

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Pokemon.name)
    private PokemonModel: mongoose.Model<Pokemon>,
    @InjectModel(Cart.name)
    private CartModel: mongoose.Model<Cart>,
    private messageService: MessageService,
  ) {}

  async getCartDetails(
    userId: string,
  ): Promise<GetCartDetailsResDto | BaseErrorResponseDto> {
    try {
      const cartDetails = await this.CartModel.findOne({
        userId: userId,
      }).lean();

      if (!cartDetails?.cartItems?.length) {
        return new GetCartDetailsResDto(
          this.messageService.getMessage([MessageKeys.CART_IS_EMPTY]),
          { cartItems: [], cartTotal: 0 },
        );
      }

      const cartItems = cartDetails.cartItems.map((item: any) => ({
        pokemonId: item.pokemonId,
        name: item.name,
        price: item.price,
        totalPrice: item.price * item.quantity,
        quantity: item.quantity,
      }));

      let cartTotal = 0;

      cartItems.forEach((cartItem) => (cartTotal += cartItem.totalPrice));

      if (cartDetails) {
        return new GetCartDetailsResDto([], { cartItems, cartTotal });
      }
    } catch (error) {
      return new BaseErrorResponseDto([], error.message);
    }
  }

  async addToCart(
    addToCartReqDto: AddToCartReqDto,
  ): Promise<AddToCartResDto | BaseErrorResponseDto> {
    if (addToCartReqDto.quantity <= 0) {
      return new BaseErrorResponseDto(
        [],
        this.messageService.getMessage([
          MessageKeys.CART_FAILURE_INVALID_QUANTITY,
        ])[0].message,
      );
    }

    try {
      const pokemonExists = await this.PokemonModel.findOne({
        id: addToCartReqDto.pokemonId,
      });

      if (!pokemonExists) {
        return new BaseErrorResponseDto(
          [],
          this.messageService.getMessage([
            MessageKeys.ADD_TO_CART_POKEMON_NOT_FOUND,
          ])[0].message,
        );
      }

      // increments quantity if item exists, or add pokemon if it doesn't exist
      const updateResult: mongoose.UpdateWriteOpResult =
        await this.CartModel.updateOne(
          {
            userId: addToCartReqDto.userEmail,
            'cartItems.pokemonId': addToCartReqDto.pokemonId,
          },
          { $inc: { 'cartItems.$.quantity': addToCartReqDto.quantity } },
        );

      // If user dont have a cart on db, adds a new one
      if (updateResult.matchedCount === 0 || updateResult.modifiedCount === 0) {
        await this.CartModel.updateOne(
          { userId: addToCartReqDto.userEmail },
          {
            $addToSet: {
              cartItems: {
                pokemonId: addToCartReqDto.pokemonId,
                name: pokemonExists.name,
                price: pokemonExists.price,
                quantity: addToCartReqDto.quantity,
              },
            },
          },
          { upsert: true },
        );
      }
      return new AddToCartResDto(
        this.messageService.getMessage([MessageKeys.ADD_TO_CART_SUCCESS]),
      );
    } catch (error) {
      return new BaseErrorResponseDto(
        [],
        this.messageService.getMessage([
          MessageKeys.ADD_TO_CART_FAILURE,
        ])[0].message,
      );
    }
  }

  async removeWithQuantity(
    body: RemoveWithQuantityDto,
  ): Promise<RemoveWithQuantityResDto | BaseErrorResponseDto> {
    if (body.quantity <= 0) {
      return new BaseErrorResponseDto(
        [],
        this.messageService.getMessage([
          MessageKeys.CART_FAILURE_INVALID_QUANTITY,
        ])[0].message,
      );
    }
    const session = await this.CartModel.startSession();

    try {
      session.startTransaction();

      const cart = await this.CartModel.findOne({
        userId: body.userEmail,
        'cartItems.pokemonId': body.pokemonId,
      });
      if (!cart) {
        throw new BadRequestException(
          this.messageService.getMessage([
            MessageKeys.REMOVE_FROM_CART_FAILURE_POKEMON_NOT_IN_CART,
          ])[0].message,
        );
      }

      if (cart) {
        const cartItem = cart.cartItems.find(
          (item: any) => item?.pokemonId == body.pokemonId,
        ) as unknown as ICartItem;
        if (cartItem.quantity < body.quantity) {
          throw new BadRequestException(
            this.messageService.getMessage([
              MessageKeys.CART_FAILURE_QUANTITY_EXCEEDS,
            ])[0].message,
          );
        }
      }

      const updatedCart = await this.CartModel.findOneAndUpdate(
        {
          userId: body.userEmail,
          'cartItems.pokemonId': body.pokemonId,
        },
        { $inc: { 'cartItems.$.quantity': -body.quantity } },
        { new: true },
      );
      if (!updatedCart) {
        throw new BadRequestException(
          this.messageService.getMessage([
            MessageKeys.REMOVE_FROM_CART_FAILURE_ITEM_NOT_FOUND,
          ])[0].message,
        );
      }

      const cartItem = updatedCart?.cartItems?.find(
        (item: any) => item.pokemonId == body.pokemonId,
      ) as unknown as ICartItem;

      // removes relevant cartItem
      if (cartItem && cartItem?.quantity <= 0) {
        await this.CartModel.findOneAndUpdate(
          { _id: updatedCart._id },
          { $pull: { cartItems: { pokemonId: body.pokemonId } } },
          { new: true },
        );
      }

      session.commitTransaction();
      return new RemoveWithQuantityResDto(
        this.messageService.getMessage([MessageKeys.REMOVE_FROM_CART_SUCCESS]),
      );
    } catch (error) {
      await session.abortTransaction();
      return new BaseErrorResponseDto([], error.message);
    } finally {
      await session.endSession();
    }
  }

  async deleteFromCart(deleteFromCartDto: DeleteFromCartDto) {
    try {
      const deletedItem = await this.CartModel.findOneAndUpdate(
        {
          userId: deleteFromCartDto.userEmail,
          'cartItems.pokemonId': deleteFromCartDto.pokemonId,
        },
        { $pull: { cartItems: { pokemonId: deleteFromCartDto.pokemonId } } },
        { new: true },
      );

      if (!deletedItem) {
        throw new BadRequestException(
          this.messageService.getMessage([
            MessageKeys.CART_DELETION_FAILURE,
          ])[0].message,
        );
      }
      return new DeleteFromCartResDto(
        this.messageService.getMessage([MessageKeys.CART_DELETION_SUCCESS]),
      );
    } catch (error) {
      return new BaseErrorResponseDto([], error.message);
    }
  }
}
