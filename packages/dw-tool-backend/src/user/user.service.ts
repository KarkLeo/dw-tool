import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/createUserDto'
import { UserEntity } from './user.entity'
import { JWT_SECRET } from '../config'
import { sign } from 'jsonwebtoken'
import { UserResponseInterface } from './types/userResponse.interface'
import { compare } from 'bcrypt'
import { LoginUserDto } from './dto/loginUserDto'
import { UpdateUserDto } from './dto/updateUser.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(user: CreateUserDto): Promise<UserEntity> {
    await this.testUserEmail(user.email)

    const newUser = new UserEntity()
    Object.assign(newUser, user)
    return await this.userRepository.save(newUser)
  }

  async login(user: LoginUserDto): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOne({
      where: {
        email: user.email,
      },
      select: ['id', 'name', 'email', 'password'],
    })

    if (!userByEmail) {
      throw new HttpException(
        'Invalid credentials',
        HttpStatus.UNPROCESSABLE_ENTITY,
      )
    }

    const isPasswordValid = await compare(user.password, userByEmail.password)

    if (!isPasswordValid) {
      throw new HttpException(
        'Invalid credentials',
        HttpStatus.UNPROCESSABLE_ENTITY,
      )
    }

    delete userByEmail.password

    return userByEmail
  }

  async update(userId: number, data: UpdateUserDto): Promise<UserEntity> {
    const user = await this.findById(userId)
    if (data.email && data.email !== user.email) {
      await this.testUserEmail(data.email)
    }

    Object.assign(user, data)
    return await this.userRepository.save(user)
  }

  findById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: {
        id,
      },
    })
  }

  generateJWT(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      JWT_SECRET,
    )
  }

  buildUserResponse(user: UserEntity): UserResponseInterface {
    return {
      user: {
        ...user,
        token: this.generateJWT(user),
      },
    }
  }

  async testUserEmail(email: string): Promise<boolean> {
    const userByEmail = await this.userRepository.findOne({
      where: {
        email,
      },
    })
    if (userByEmail) {
      throw new HttpException(
        'User already exists',
        HttpStatus.UNPROCESSABLE_ENTITY,
      )
    }

    return true
  }
}
