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

    const count = await this.prisma.email.count({
      where: {
        sendEmailsId: userId,
      },
    });

    const emails = await this.prisma.email.findMany({
      where: {
        sendEmailsId: userId,
      },
      skip: skip,
      take: take,
      orderBy: {
        sentAt: 'desc', // or 'asc' for ascending order
      },
    });

    return {
      emails,
      count,
    };
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

    const count = await this.prisma.email.count({
      where: {
        receivedEmailsID: userId,
      },
    });

    const emails = await this.prisma.email.findMany({
      where: {
        receivedEmailsID: userId,
      },
      skip: skip,
      take: take,
      orderBy: {
        sentAt: 'desc', // or 'asc' for ascending order
      },
    });
    return {
      emails,
      count,
    };
  }

  // Email Details
  async gettingEmailDetails(emailId: string) {
    return this.prisma.email.findUnique({
      where: {
        id: emailId,
      },
    });
  }

  // Update Reading Emails
  async updateReadEmail(emailId: string) {
    return this.prisma.email.update({
      where: {
        id: emailId,
      },
      data: {
        isRead: true,
      },
    });
  }

  // Getting Unread Emails with Pagination
  async getUnreadEmails(userId: string, skip: number, take: number) {
    if (!userId) throw new NotAcceptableException('User Data Not Found');

    return this.prisma.email.findMany({
      where: {
        isRead: false,
      },
      skip: skip,
      take: take,
    });
  }

  // Update Reading Emails
  async updateImportantEmail(emailId: string) {
    return this.prisma.email.update({
      where: {
        id: emailId,
      },
      data: {
        isImportant: true,
      },
    });
  }

  // Getting Unread Emails with Pagination
  async getImportantEmails(userId: string, skip: number, take: number) {
    if (!userId) throw new NotAcceptableException('User Data Not Found');

    return this.prisma.email.findMany({
      where: {
        isImportant: true,
      },
      skip: skip,
      take: take,
    });
  }

  // Update spam Emails
  async updateSpamEmail(emailId: string) {
    return this.prisma.email.update({
      where: {
        id: emailId,
      },
      data: {
        isSpam: true,
      },
    });
  }
  // Getting Spam Emails with Pagination
  async getSpamEmails(userId: string, skip: number, take: number) {
    if (!userId) throw new NotAcceptableException('User Data Not Found');

    return this.prisma.email.findMany({
      where: {
        isSpam: true,
      },
      skip: skip,
      take: take,
    });
  }

  // Delete email by id
  async deleteEmail(emailId: string) {
    this.prisma.email.delete({
      where: {
        id: emailId,
      },
    });
  }
}
