import { Injectable } from '@nestjs/common';
import { StatusDto } from './dto/status-dto';

@Injectable()
export class StatusService {
  constructor() {}

  getStatus(): StatusDto {
    return {
      status: 'UP',
    };
  }
}
