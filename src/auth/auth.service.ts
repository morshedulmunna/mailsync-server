import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma, PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';
import { UserData } from '../types/index';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaClient,
    private jwtService: JwtService,
  ) {}

  // Sign Up Service
  async signup(userDto: Prisma.UserCreateInput): Promise<UserData> {
    const { email, password, name } = userDto;

    // Hashing Password
    const hash = await argon2.hash(password);

    // Checking Already register User
    const alreadyRegisterUser = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (alreadyRegisterUser) {
      throw new ForbiddenException('User Already Register');
    }

    // Store User Data in Database
    const createUser = await this.prisma.user.create({
      data: {
        email,
        password: hash,
        name,
      },
    });

    // Getting Token
    const { accessToken, refreshToken } = await this.getToken(
      createUser.id,
      createUser.email,
    );
    await this.updateUserData(createUser.id, refreshToken);

    return {
      user: {
        name,
        email,
      },
      token: {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    };
  }

  // Sign in Service
  async signin(userDto: Prisma.UserCreateInput): Promise<UserData> {
    // finding unregister user
    const user = await this.prisma.user.findUnique({
      where: {
        email: userDto.email,
      },
    });
    if (!user)
      throw new ForbiddenException({
        message: 'User Not Register',
      });

    // if password not match then throw an error
    const isMatch = await argon2.verify(user.password, userDto.password);

    if (!isMatch)
      throw new ForbiddenException({
        message: 'Password Not Match',
      });

    // Getting Token
    const { accessToken, refreshToken } = await this.getToken(
      user.id,
      user.email,
    );
    await this.updateUserData(user.id, refreshToken);

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      token: {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    };
  }

  async signout(userId: string) {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        refrash_token: {
          not: null,
        },
      },
      data: {
        refrash_token: null,
      },
    });

    return {
      message: 'Log Out Successfully',
    };
  }

  async refreshToken() {
    return `This action returns all auth`;
  }

  async delete() {
    return this.prisma.user.deleteMany();
  }

  /*
   * Helper Function
   */
  // Token Generate
  async getToken(
    userId: string,
    email: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const access_token = this.jwtService.signAsync(
      {
        userId,
        email,
      },
      {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: 60 * 15,
      },
    );
    const refresh_token = this.jwtService.signAsync(
      {
        userId,
        email,
      },
      {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: 60 * 60 * 24 * 7,
      },
    );
    const [refreshToken, accessToken] = await Promise.all([
      refresh_token,
      access_token,
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
  // Update user Refresh Token with hashing in the DB
  async updateUserData(userId: string, refreshToken: string) {
    const hashToken = await argon2.hash(refreshToken);

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refrash_token: hashToken,
      },
    });
  }
}
