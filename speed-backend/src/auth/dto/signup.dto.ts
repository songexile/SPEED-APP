import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum } from 'class-validator';

export enum UserRole {
    SUBMITTER = 'submitter',
    MODERATOR = 'moderator',
    ANALYST = 'analyst',
    ADMINISTRATOR = 'administrator',
}

export class SignUpDto {
    @IsNotEmpty({ message: 'Username is required' })
    @IsString({ message: 'Username must be a string' })
    readonly username: string;

    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Please enter a valid email address' })
    readonly email: string;

    @IsNotEmpty({ message: 'Password is required' })
    @IsString({ message: 'Password must be a string' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    readonly password: string;

    @IsNotEmpty({ message: 'Role is required' })
    @IsEnum(UserRole, { message: 'Invalid role' })
    readonly role: UserRole;
}
