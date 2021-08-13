import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
      user.password = createUserDto.password; // TODO: fix this
      user.email = createUserDto.email;
      user.firstName = createUserDto.firstName;
      user.lastName = createUserDto.lastName;
      user.phone = createUserDto.phone;
      user.birthDate = createUserDto.birthDate;
      user.salt = 'superSecret51'; // TODO: fix this
    } catch (error) {
      throw new InternalServerErrorException(
        error,
        `Something wrong in creating user`,
      );
    }
    return this.save(user);
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
    found.password = updateUserDto.password; // TODO: fix this
    found.email = updateUserDto.email;
    found.firstName = updateUserDto.firstName;
    found.lastName = updateUserDto.lastName;
    found.phone = updateUserDto.phone;
    found.birthDate = updateUserDto.birthDate;

    return this.save(found);
  }

  async removeUser(id: number): Promise<void> {
    const found = await this.findUser(id);

    await this.remove(found);
  }
}
