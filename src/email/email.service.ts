import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class EmailService {
  constructor(private prisma: PrismaClient) {}
  create(createEmailDto: Prisma.EmailCreateInput) {
    return this.prisma.email.create({
      data: {
        ...createEmailDto,
      },
    });
  }

  findAll() {
    return `This action returns all email`;
  }

  findOne(id: number) {
    return `This action returns a #${id} email`;
  }

  update(id: number, updateEmailDto: any) {
    return `This action updates a #${id} email`;
  }

  remove(id: number) {
    return `This action removes a #${id} email`;
  }
}
