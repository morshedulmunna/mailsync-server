import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Prisma } from '@prisma/client';
import { GetCurrentUserById } from 'src/utils/GetCurrentUserId.decoder';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  // Send email to email
  @UseGuards(AuthGuard('jwt-auth'))
  @Post('/sent')
  emailSending(
    @Body() createEmailDto: Prisma.EmailCreateInput,
    @GetCurrentUserById() userId: string,
  ) {
    return this.emailService.emailSending(createEmailDto, userId);
  }

  // getSendingEmail Email
  @UseGuards(AuthGuard('jwt-auth'))
  @Get('/sending')
  getSendingEmail(
    @GetCurrentUserById() userId: string,
    @Query() { skip, take }: { skip: string; take: string },
  ) {
    const skipNumber = parseInt(skip);
    const takeNumber = parseInt(take);
    return this.emailService.getSendingEmail(userId, skipNumber, takeNumber);
  }

  // Draft Email send to database
  @UseGuards(AuthGuard('jwt-auth'))
  @Post('/draft')
  draftEmail(
    @Body() createEmailDto: Prisma.EmailCreateInput,
    @GetCurrentUserById() userId: string,
  ) {
    return this.emailService.draftEmail(createEmailDto, userId);
  }
  // getDraftEmail Email
  @UseGuards(AuthGuard('jwt-auth'))
  @Get('/draft')
  getDraftEmail(
    @GetCurrentUserById() userId: string,
    @Query() { skip, take }: { skip: string; take: string },
  ) {
    const skipNumber = parseInt(skip);
    const takeNumber = parseInt(take);
    return this.emailService.getDraftEmail(userId, skipNumber, takeNumber);
  }

  // get Inbox  Email
  @UseGuards(AuthGuard('jwt-auth'))
  @Get('/inbox')
  getInboxEmail(
    @GetCurrentUserById() userId: string,
    @Query() { skip, take }: { skip: string; take: string },
  ) {
    const skipNumber = parseInt(skip);
    const takeNumber = parseInt(take);
    return this.emailService.getInboxEmail(userId, skipNumber, takeNumber);
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
