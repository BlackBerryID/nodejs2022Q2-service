import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: uuidv4(), // uuid v4
      login: '2',
      password: '3',
      version: 0, // integer number, increments on update
      createdAt: 3, // timestamp of creation
      updatedAt: 4, // timestamp of last update
    },
  ];

  getAll() {
    return this.users;
  }

  getById(id: string) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }
}
