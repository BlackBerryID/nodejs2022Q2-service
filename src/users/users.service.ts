import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { InMemoryDb } from 'src/db/in-memory-db';

const NOT_FOUND_MESSAGE = 'User not found';

@Injectable()
export class UsersService {
  constructor(private readonly db: InMemoryDb) {}

  getAll() {
    return this.db.users;
  }

  getById(id: string) {
    const user = this.db.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException(NOT_FOUND_MESSAGE);
    return user;
  }

  createUser(createUserDto: CreateUserDto) {
    const timestamp = Date.now();

    const tempUserData: User = {
      ...createUserDto,
      id: uuidv4(),
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    this.db.users.push({ ...tempUserData });

    delete tempUserData.password;
    return tempUserData;
  }

  updateUserPassword(id: string, updateUserDto: UpdateUserDto) {
    let tempUserData = null;
    let userIndex = null;

    this.db.users.forEach((user, index) => {
      if (user.id === id) {
        if (user.password !== updateUserDto.oldPassword) {
          throw new ForbiddenException('Your password is wrong');
        }
        userIndex = index;
        tempUserData = {
          ...this.db.users[index],
          password: updateUserDto.newPassword,
          version: this.db.users[index].version + 1,
          updatedAt: Date.now(),
        };
      }
    });

    if (userIndex === null) {
      throw new NotFoundException(NOT_FOUND_MESSAGE);
    } else {
      this.db.users[userIndex] = { ...tempUserData };
      delete tempUserData.password;
      return tempUserData;
    }
  }

  removeUser(id: string) {
    let userIndex = null;

    this.db.users.forEach((user, index) => {
      if (user.id === id) {
        userIndex = index;
      }
    });

    if (userIndex === null) {
      throw new NotFoundException(NOT_FOUND_MESSAGE);
    } else {
      this.db.users.splice(userIndex, 1);
    }
  }
}
