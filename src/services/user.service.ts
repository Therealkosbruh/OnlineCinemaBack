import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/database.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

async registerUser(name: string, surname: string, login: string, password: string, email: string): Promise<User> {
    const user = new User();
    user.name = name;
    user.surname = surname;
    user.login = login;
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.email = email;
    user.paymentDate = new Date();
    return this.userRepository.save(user);
  }

  async loginUser(loginOrEmail: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: [
        { login: loginOrEmail },
        { email: loginOrEmail },
      ],
    });
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    return user;
  }
}