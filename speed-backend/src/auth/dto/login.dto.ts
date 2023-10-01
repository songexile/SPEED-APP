import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Please enter a valid email' })
    readonly email: string;

    @IsNotEmpty({ message: 'Password is required' })
    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    readonly password: string;
}
