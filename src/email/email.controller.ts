import { Body, Controller, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('/sent')
  emailSending(@Body() createEmailDto: Prisma.EmailCreateInput) {
    return this.emailService.emailSending(createEmailDto);
  }

  // @Get()
  // findAll() {
  //   return this.emailService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.emailService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateEmailDto: any) {
  //   return this.emailService.update(+id, updateEmailDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.emailService.remove(+id);
  // }
}
