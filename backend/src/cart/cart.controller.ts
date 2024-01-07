import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags, ApiBadRequestResponse } from '@nestjs/swagger';
import { AddToCartReqDto } from './dto/add-to-cart-req-dto';
import { CartService } from './cart.service';
import { EmailMatchGuard } from 'src/auth/email-match-guard';
import { AddToCartResDto } from './dto/add-to-cart-res-dto';
import { BaseErrorResponseDto } from 'commonDto/base-error-response-dto';
import { GetCartDetailsResDto } from './dto/get-card-details-res-dto';
import { DeleteFromCartDto } from './dto/delete-from-cart-dto';
import { DeleteFromCartResDto } from './dto/delete-from-cart-res-dto';
import { RemoveWithQuantityDto } from './dto/remove-with-quantity-dto';
import { RemoveWithQuantityResDto } from './dto/remove-with-quantity-res-dto';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(EmailMatchGuard)
  @ApiOkResponse({ type: GetCartDetailsResDto })
  @ApiBadRequestResponse({
    type: BaseErrorResponseDto,
  })
  @Get('/')
  getCartDetails(@Query('userId') userId: string) {
    return this.cartService.getCartDetails(userId);
  }

  @UseGuards(EmailMatchGuard)
  @ApiOkResponse({ type: AddToCartResDto })
  @ApiBadRequestResponse({ type: BaseErrorResponseDto })
  @Post('/add')
  addToCart(
    @Body() addToCartDto: AddToCartReqDto,
  ): Promise<AddToCartResDto | BaseErrorResponseDto> {
    return this.cartService.addToCart(addToCartDto);
  }

  @UseGuards(EmailMatchGuard)
  @ApiOkResponse({ type: RemoveWithQuantityResDto })
  @ApiBadRequestResponse({ type: BaseErrorResponseDto })
  @Patch('/removeWithQuantity')
  removeWithQuantity(
    @Body() removeWithQuantityDto: RemoveWithQuantityDto,
  ): Promise<RemoveWithQuantityResDto | BaseErrorResponseDto> {
    return this.cartService.removeWithQuantity(removeWithQuantityDto);
  }

  @ApiOkResponse({ type: DeleteFromCartResDto })
  @ApiBadRequestResponse({ type: BaseErrorResponseDto })
  @UseGuards(EmailMatchGuard)
  @Delete('/delete')
  deleteFromCart(
    @Body() deleteFromCartDto: DeleteFromCartDto,
  ): Promise<DeleteFromCartResDto | BaseErrorResponseDto> {
    return this.cartService.deleteFromCart(deleteFromCartDto);
  }
}
