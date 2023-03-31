import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUserDto';
import { UserResponseInterface } from './types/userResponse.interface';
import { LoginUserDto } from './dto/loginUserDto';
import { User } from './decorators/user.decorator';
import { UserEntity } from './user.entity';
import { AuthGuard } from './guards/auth.guard';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('auth')
  @UsePipes(new ValidationPipe())
  async create(@Body() user: CreateUserDto): Promise<UserResponseInterface> {
    const newUser = await this.userService.create(user);
    return this.userService.buildUserResponse(newUser);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() user: LoginUserDto): Promise<any> {
    const userByEmail = await this.userService.login(user);
    return this.userService.buildUserResponse(userByEmail);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  async me(@User() user: UserEntity): Promise<UserResponseInterface> {
    return this.userService.buildUserResponse(user);
  }

  @Patch('me')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async update(
    @User('id') userId: number,
    @Body() data: UpdateUserDto,
  ): Promise<UserResponseInterface> {
    const updatedUser = await this.userService.update(userId, data);
    return this.userService.buildUserResponse(updatedUser);
  }
}
