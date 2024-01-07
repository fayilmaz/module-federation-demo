import { ApiProperty } from '@nestjs/swagger';
import { BaseSuccessResponseDto } from 'commonDto/base-success-response-dto';
import { Announcement } from 'src/commonDto/AnnouncementList';

class CartItem {
  _id: string;
  pokemonId: number;
  name: string;
  price: number;
  totalPrice: number;
  quantity: number;
}

export class GetCartDetailsResDto extends BaseSuccessResponseDto {
  @ApiProperty({ required: true, example: [] })
  announcementList: Announcement[] | [];
  @ApiProperty({
    required: true,
    example: {
      cartItems: [
        {
          _id: '6598771ac31ad060008c4e23',
          pokemonId: 6,
          name: 'Charizard',
          price: 1500,
          totalPrice: 36000,
          quantity: 24,
        },
      ],
      cartTotal: 36000,
    },
  })
  data: {
    cartItems: CartItem[] | [];
    cartTotal: number;
  };

  constructor(announcementList: Announcement[] | [], { cartItems, cartTotal }) {
    super();
    this.announcementList = announcementList;
    this.data = {
      cartItems: cartItems,
      cartTotal,
    };
  }
}
