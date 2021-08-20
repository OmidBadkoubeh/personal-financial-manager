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

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.createUser(createUserDto);
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.findAllUsers();
  }

  async getUser(id: number): Promise<User> {
    return this.userRepository.findUser(id);
  }

  async getUserByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ username });
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userRepository.updateUser(id, updateUserDto);
  }

  async removeUser(id: number): Promise<void> {
    this.userRepository.removeUser(id);
  }

  async validateUser(username: string, password: string): Promise<string> {
    return this.userRepository.validateUser(username, password);
  }
}
