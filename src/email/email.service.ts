import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class EmailService {
  constructor(private prisma: PrismaClient) {}
  emailSending(createEmailDto: Prisma.EmailCreateInput) {
    return this.prisma.email.create({
      data: {
        ...createEmailDto,
      },
    });
  }
}
