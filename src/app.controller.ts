import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): object {
    return {
      success: 200,
      message: 'Health Route Working',
    };
  }
}
