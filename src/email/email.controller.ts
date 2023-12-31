import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
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

  // get Email Details
  @UseGuards(AuthGuard('jwt-auth'))
  @Get('/details/:emailId')
  gettingEmailDetails(@Param('emailId') emailId: string) {
    return this.emailService.gettingEmailDetails(emailId);
  }

  // Email Reading Update Patch
  @UseGuards(AuthGuard('jwt-auth'))
  @Patch('/read/:emailId')
  updateReadEmail(@Param('emailId') emailId: string) {
    return this.emailService.updateReadEmail(emailId);
  }

  // Getting Unread Email by Pagination
  @UseGuards(AuthGuard('jwt-auth'))
  @Get('/unread')
  getUnreadEmails(
    @GetCurrentUserById() userId: string,
    @Query() { skip, take }: { skip: string; take: string },
  ) {
    const skipNumber = parseInt(skip);
    const takeNumber = parseInt(take);
    console.log(skipNumber, takeNumber);

    return this.emailService.getUnreadEmails(userId, skipNumber, takeNumber);
  }

  // Email Important Update Patch
  @UseGuards(AuthGuard('jwt-auth'))
  @Patch('/important/:emailId')
  updateImportantEmail(@Param('emailId') emailId: string) {
    return this.emailService.updateImportantEmail(emailId);
  }

  // Email Important Update Patch
  @UseGuards(AuthGuard('jwt-auth'))
  @Get('/important')
  getImportantEmails(
    @GetCurrentUserById() userId: string,
    @Query() { skip, take }: { skip: string; take: string },
  ) {
    const skipNumber = parseInt(skip);
    const takeNumber = parseInt(take);
    console.log(skipNumber, takeNumber);

    return this.emailService.getImportantEmails(userId, skipNumber, takeNumber);
  }

  // Email Spam Update Patch
  @UseGuards(AuthGuard('jwt-auth'))
  @Patch('/spam/:emailId')
  updateSpamEmail(@Param('emailId') emailId: string) {
    return this.emailService.updateSpamEmail(emailId);
  }
  // Email Spam Update Patch
  @UseGuards(AuthGuard('jwt-auth'))
  @Get('/important')
  getSpamEmails(
    @GetCurrentUserById() userId: string,
    @Query() { skip, take }: { skip: string; take: string },
  ) {
    const skipNumber = parseInt(skip);
    const takeNumber = parseInt(take);
    console.log(skipNumber, takeNumber);

    return this.emailService.getSpamEmails(userId, skipNumber, takeNumber);
  }

  // Delete Email by ID
  @UseGuards(AuthGuard('jwt-auth'))
  @Delete('/delete/:emailId')
  deleteEmail(@Query('emailId') emailId: string) {
    return this.emailService.deleteEmail(emailId);
  }
}
