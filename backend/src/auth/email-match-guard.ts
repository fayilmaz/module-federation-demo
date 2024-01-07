import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { MessageService } from 'src/message/message.service';
import { MessageKeys } from 'src/message/messageKeysEnum';

@Injectable()
export class EmailMatchGuard implements CanActivate {
  // Checks if the email from the JWT token matches the email in the request body.
  // This ensures that the user is performing actions on their own account.
  constructor(private messageService: MessageService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userEmailFromJwtToken = request.user?.user?.id;

    const method = request.method;
    let userEmailFromRequest: string;

    if (method === 'GET') {
      userEmailFromRequest = request.query.userId || request.params.userId;
    } else {
      // POST, PATCH, DELETE
      userEmailFromRequest = request.body.userEmail;
    }

    if (!userEmailFromJwtToken || !userEmailFromRequest) {
      throw new UnauthorizedException('User information or email not provided');
    }

    if (userEmailFromJwtToken !== userEmailFromRequest) {
      throw new ForbiddenException(
        this.messageService.getMessage([MessageKeys.WRONG_USER])[0].message,
      );
    }

    return true;
  }
}
