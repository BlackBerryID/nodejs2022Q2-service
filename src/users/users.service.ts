import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: uuidv4(), // uuid v4
      login: '2',
      password: '3',
      version: 1, // integer number, increments on update
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

  createUser(createUserDto: CreateUserDto) {
    if (
      !createUserDto.hasOwnProperty('login') ||
      !createUserDto.hasOwnProperty('password')
    ) {
      throw new HttpException(
        'Login and password are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    const timestamp = Date.now();

    const tempUserData: User = {
      ...createUserDto,
      id: uuidv4(),
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    this.users.push({ ...tempUserData });

    delete tempUserData.password;
    return tempUserData;
  }

  updateUserPassword(id: string, updateUserDto: UpdateUserDto) {
    let tempUserData = null;
    let userIndex = null;

    this.users.map((user, index) => {
      if (user.id === id) {
        if (user.password !== updateUserDto.oldPassword) {
          throw new HttpException(
            'Your password is wrong',
            HttpStatus.FORBIDDEN,
          );
        }
        userIndex = index;
        tempUserData = {
          ...this.users[index],
          password: updateUserDto.newPassword,
          version: this.users[index].version + 1,
          updatedAt: Date.now(),
        };
      }
    });

    if (userIndex === null) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    } else {
      this.users[userIndex] = { ...tempUserData };
      delete tempUserData.password;
      return tempUserData;
    }
  }

  removeUser(id: string) {
    let userIndex = null;

    this.users.forEach((user, index) => {
      if (user.id === id) {
        userIndex = index;
      }
    });

    if (userIndex === null) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    } else {
      this.users.splice(userIndex, 1);
    }
  }
}
