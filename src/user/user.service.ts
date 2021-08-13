import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.createUser(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAllUsers();
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findUser(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userRepository.updateUser(id, updateUserDto);
  }

  async remove(id: number): Promise<void> {
    this.userRepository.removeUser(id);
  }
}
