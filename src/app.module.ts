import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [EmailModule, AuthModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
