import {
  IsDate,
  IsEmail,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import { PasswordRegEx } from '@src/config/constants';

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(PasswordRegEx, { message: 'Password is too weak!' })
  password: string;

  @IsString()
  firstName?: string;

  @IsString()
  lastName?: string;

  @IsPhoneNumber()
  phone?: string;

  @IsEmail()
  email: string;

  @IsDate()
  birthDate?: Date;
}
