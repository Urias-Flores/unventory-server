import { Get, Injectable } from "@nestjs/common";

@Injectable()
export class AppService {

  @Get()
  workingMessage(): string {
    return 'This API is working!';
  }
}
