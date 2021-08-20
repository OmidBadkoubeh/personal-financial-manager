import {
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    try {
      user.username = createUserDto.username;
      user.email = createUserDto.email;
      user.firstName = createUserDto.firstName;
      user.lastName = createUserDto.lastName;
      user.phone = createUserDto.phone;
      user.birthDate = createUserDto.birthDate;
      user.salt = await bcrypt.genSalt();
      user.password = await this.hashPassword(
        createUserDto.password,
        user.salt,
      );
    } catch (error) {
      throw new InternalServerErrorException(`Something wrong in createUser`);
    }

    const savedUser = await this.save(user);
    return this.hidePrivateProperties(savedUser);
  }

  async findUser(id: number): Promise<User> {
    const found = await this.findOne({ id });

    if (!found) {
      throw new NotFoundException(`User with id "${id}" not found!`);
    }

    return found;
  }

  async findAllUsers(): Promise<User[]> {
    return this.find();
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const found = await this.findUser(id);

    found.username = updateUserDto.username;
    found.email = updateUserDto.email;
    found.firstName = updateUserDto.firstName;
    found.lastName = updateUserDto.lastName;
    found.phone = updateUserDto.phone;
    found.birthDate = updateUserDto.birthDate;
    found.password = await this.hashPassword(
      updateUserDto.password,
      found.salt,
    );

    return this.save(found);
  }

  async removeUser(id: number): Promise<void> {
    const found = await this.findUser(id);

    await this.remove(found);
  }

  async findUserByUsername(username: string) {
    const found = await this.findOne({ username });

    if (!found) {
      throw new UnauthorizedException();
    }

    return found;
  }

  async validateUser(username: string, password: string): Promise<string> {
    const found = await this.findUserByUsername(username);

    if (!found) {
      throw new UnauthorizedException();
    }

    const hashedPassword = await this.hashPassword(password, found.salt);
    if (found.password === hashedPassword) {
      return found.username;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  private hidePrivateProperties(user: User): User {
    delete user.password;
    delete user.salt;
    return user;
  }
}
