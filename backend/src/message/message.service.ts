import { Injectable } from '@nestjs/common';
import { MessageKeys } from './messageKeysEnum';

@Injectable()
export class MessageService {
  // TODO: move other messages to here from all services
  private messages = {
    [MessageKeys.USER_CREATION_SUCCESSFUL]: {
      code: 'PS001',
      message: 'User created successfully',
    },
    [MessageKeys.POKEMON_NOT_FOUND]: {
      code: 'PS010',
      message: 'Pokemon not found.',
    },
    [MessageKeys.COULD_NOT_GET_POKEMONS]: {
      code: 'PS011',
      message: 'Unable to retrieve Pokemon list.',
    },
    [MessageKeys.USER_NOT_FOUND]: {
      code: 'PS012',
      message: 'User not found',
    },
    [MessageKeys.CART_IS_EMPTY]: {
      code: 'PS020',
      message: 'Your cart is empty',
    },
    [MessageKeys.ADD_TO_CART_POKEMON_NOT_FOUND]: {
      code: 'PS021',
      message: 'Pokemon not found for adding to cart.',
    },
    [MessageKeys.ADD_TO_CART_SUCCESS]: {
      code: 'PS022',
      message: 'Pokemon added to cart successfully.',
    },
    [MessageKeys.ADD_TO_CART_FAILURE]: {
      code: 'PS023',
      message: 'Failed to add Pokemon to the cart.',
    },
    [MessageKeys.REMOVE_FROM_CART_SUCCESS]: {
      code: 'PS024',
      message: 'Pokemon successfully removed from cart',
    },
    [MessageKeys.REMOVE_FROM_CART_FAILURE]: {
      code: 'PS025',
      message: 'Failed to remove Pokemon from the cart.',
    },
    [MessageKeys.REMOVE_FROM_CART_FAILURE_ITEM_NOT_FOUND]: {
      code: 'PS026',
      message: 'Pokemon not found in your cart.',
    },
    [MessageKeys.REMOVE_FROM_CART_FAILURE_POKEMON_NOT_IN_CART]: {
      code: 'PS027',
      message:
        'The specified Pokemon is not in your cart. Please check your cart contents and try again.',
    },
    [MessageKeys.CART_FAILURE_INVALID_QUANTITY]: {
      code: 'PS028',
      message: 'Invalid quantity. Quantity must be greater than zero',
    },
    [MessageKeys.CART_FAILURE_QUANTITY_EXCEEDS]: {
      code: 'PS029',
      message: 'Cannot remove more Pokemons than are in the cart.',
    },
    [MessageKeys.UNAUTHORIZED_USER]: {
      code: 'PS030',
      message: 'Unauthorized access detected.',
    },
    [MessageKeys.CART_DELETION_SUCCESS]: {
      code: 'PS031',
      message: 'Items successfully deleted from the cart.',
    },
    [MessageKeys.WRONG_USER]: {
      code: 'PS032',
      message: 'You are not authorized to perform this action.',
    },
    [MessageKeys.INSUFFICIENT_QUANTITY_IN_CART]: {
      code: 'PS033',
      message: 'Insufficient quantity in cart for removal.',
    },
    [MessageKeys.CART_DELETION_FAILURE]: {
      code: 'PS034',
      message:
        'Unable to remove the specified Pokemon as it was not found in your cart. Please check your cart to confirm the items before attempting removal.',
    },
  };

  getMessage(keys: string[]): { code: string; message: string }[] {
    const returnMessages = [];
    keys.forEach((key) => returnMessages.push(this.messages[key]));
    return returnMessages;
  }
}
