import { Controller, Get } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusDto } from './dto/status-dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'decorators/public';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Public()
  @ApiTags('status')
  @ApiOkResponse({ type: StatusDto })
  @Get()
  getStatus(): StatusDto {
    return this.statusService.getStatus();
  }
}
