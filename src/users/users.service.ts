import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from 'src/exceptions/not-found';
import { checkAllRequiredProps } from 'src/utils/check-all-required-props';
import { ForbiddenException } from 'src/exceptions/forbidden';

const NOT_FOUND_MESSAGE = 'User not found';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  getAll() {
    return this.users;
  }

  getById(id: string) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException(NOT_FOUND_MESSAGE);
    return user;
  }

  createUser(createUserDto: CreateUserDto) {
    const requiredProps = ['login', 'password'];

    checkAllRequiredProps(
      createUserDto,
      'Login and password are required',
      requiredProps,
    );

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
    const requiredProps = ['oldPassword', 'newPassword'];

    checkAllRequiredProps(
      updateUserDto,
      'old password and new password are required',
      requiredProps,
    );

    let tempUserData = null;
    let userIndex = null;

    this.users.forEach((user, index) => {
      if (user.id === id) {
        if (user.password !== updateUserDto.oldPassword) {
          throw new ForbiddenException('Your password is wrong');
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
      throw new NotFoundException(NOT_FOUND_MESSAGE);
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
      throw new NotFoundException(NOT_FOUND_MESSAGE);
    } else {
      this.users.splice(userIndex, 1);
    }
  }
}
