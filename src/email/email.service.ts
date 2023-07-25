import { Injectable, NotAcceptableException } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class EmailService {
  constructor(private prisma: PrismaClient) {}

  // Email Send to Database
  async emailSending(emailDto: Prisma.EmailCreateInput, userId: string) {
    const { sendingEmail, subject, body } = emailDto;

    const _isReceivedEmailAvailable = await this.prisma.user.findUnique({
      where: {
        email: sendingEmail,
      },
    });

    if (!_isReceivedEmailAvailable)
      throw new NotAcceptableException('Invalid Email Address');

    if (_isReceivedEmailAvailable.id === userId) {
      throw new NotAcceptableException('You can not send email to yourself');
    }

    return this.prisma.email.create({
      data: {
        sendingEmail,
        subject,
        body,
        sendEmails: {
          connect: {
            id: userId,
          },
        },
        receivedEmails: {
          connect: {
            id: _isReceivedEmailAvailable.id,
          },
        },
      },
    });
  }

  // Draft Email Set in Database
  async draftEmail(createEmailDto: Prisma.EmailCreateInput, userId: string) {
    if (!userId) throw new NotAcceptableException('Access Not Available');

    return this.prisma.email.create({
      data: {
        sendingEmail: createEmailDto.sendingEmail,
        subject: createEmailDto.subject,
        body: createEmailDto.body,
        isDraft: true,
        draftEmails: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  // Get Sending Email for user
  async getSendingEmail(userId: string, skip: number, take: number) {
    if (!userId) throw new NotAcceptableException('User Data Not Found');
    return this.prisma.email.findMany({
      where: {
        AND: [{ isSent: true }, { sendEmailsId: userId }],
      },
      skip: skip,
      take: take,
    });
  }

  // Get Draft Email for user
  async getDraftEmail(userId: string, skip: number, take: number) {
    if (!userId) throw new NotAcceptableException('User Data Not Found');
    return this.prisma.email.findMany({
      where: {
        AND: [{ isDraft: true }, { draftEmailsId: userId }],
      },
      skip: skip,
      take: take,
    });
  }

  // Inbox Email Getting with Pagination
  async getInboxEmail(userId: string, skip: number, take: number) {
    if (!userId) throw new NotAcceptableException('User Data Not Found');
    return this.prisma.email.findMany({
      where: {
        receivedEmailsID: userId,
      },
      skip: skip,
      take: take,
    });
  }
}
