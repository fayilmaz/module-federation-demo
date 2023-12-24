import { Controller, Get } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusDto } from './dto/status-dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @ApiTags('status')
  @ApiOkResponse({ type: StatusDto })
  @Get()
  getStatus(): StatusDto {
    return this.statusService.getStatus();
  }
}
