import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common'
import { CharacterService } from './character.service'
import { AuthGuard } from '../user/guards/auth.guard'
import { User } from '../user/decorators/user.decorator'
import { UserEntity } from '../user/user.entity'
import { CreateCharacterDto } from './dto/createCharacterDto'
import { CharacterEntity } from './character.entity'
import { CharacterListResponseInterface } from './types/characterListResponse.interface'

@Controller('characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Get()
  @UseGuards(AuthGuard)
  async findAll(
    @User() currentUser: UserEntity,
  ): Promise<CharacterListResponseInterface[]> {
    return this.characterService.buildCharacterListResponse(
      await this.characterService.findAll(currentUser),
    )
  }

  @Post('/create')
  @UseGuards(AuthGuard)
  // @UsePipes(new ValidationPipe())
  async create(
    @Body() createCharacterDto: CreateCharacterDto,
    @User() currentUser: UserEntity,
  ): Promise<CharacterEntity> {
    return this.characterService.create(currentUser, createCharacterDto)
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id') characterId: string): Promise<CharacterEntity> {
    return this.characterService.findOneById(Number(characterId))
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async delete(
    @User('id') currentUserId: number,
    @Param('id') characterId: string,
  ): Promise<CharacterEntity> {
    return await this.characterService.delete(
      Number(characterId),
      currentUserId,
    )
  }
}
