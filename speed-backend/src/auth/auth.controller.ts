import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/signup')
    async signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
        try {
            const result = await this.authService.signUp(signUpDto);
            return result;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Post('/login')
    async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
        try {
            const result = await this.authService.login(loginDto);
            return result;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
