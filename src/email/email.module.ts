import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';

@Module({
  controllers: [EmailController],
  providers: [EmailService, PrismaClient],
})
export class EmailModule {}
