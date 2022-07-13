import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.getAll();
  }

  @Get(':id')
  getUser(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): User {
    return this.usersService.getById(id);
  }
}
