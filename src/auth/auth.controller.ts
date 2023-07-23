import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Prisma } from '@prisma/client';
import { GetCurrentUserById } from 'src/utils/GetCurrentUserId.decoder';
import { UserData } from '../types/index';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/local/signup')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() userDto: Prisma.UserCreateInput): Promise<UserData> {
    return this.authService.signup(userDto);
  }

  @Post('/local/signin')
  @HttpCode(HttpStatus.OK)
  signin(@Body() userDto: Prisma.UserCreateInput): Promise<UserData> {
    return this.authService.signin(userDto);
  }

  @UseGuards(AuthGuard('jwt-auth'))
  @Get('/signout')
  @HttpCode(HttpStatus.OK)
  signout(@GetCurrentUserById() userId: string) {
    return this.authService.signout(userId);
  }

  // @UseGuards(AuthGuard('jwt-refresh'))
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  refreshToken() {
    return this.authService.refreshToken();
  }

  @Get('/Delete')
  delete() {
    return this.authService.delete();
  }
}
