import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import SignInDTO from 'src/dto/SignInDTO';
import { AuthService } from 'src/services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDTO): Promise<any> {
    try{
      return await this.authService.signIn(signInDto.email, signInDto.senha);
    }
    catch	(e) {
      throw e;
    }
  }
}