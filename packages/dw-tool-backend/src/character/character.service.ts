import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { UserEntity } from '../user/user.entity'
import { CreateCharacterDto } from './dto/createCharacterDto'
import { CharacterEntity } from './character.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CharacterListResponseInterface } from './types/characterListResponse.interface'

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(CharacterEntity)
    private readonly characterRepository: Repository<CharacterEntity>,
  ) {}

  async findAll(currentUser: UserEntity): Promise<CharacterEntity[]> {
    return await this.characterRepository.find({
      where: {
        user: { id: currentUser.id },
      },
    })
  }

  async create(
    currentUser: UserEntity,
    createCharacterDto: CreateCharacterDto,
  ): Promise<CharacterEntity> {
    const character = new CharacterEntity()

    character.name = createCharacterDto.name
    character.looks = Object.values(createCharacterDto.looks || {})

    character.class = createCharacterDto.class
    character.race = createCharacterDto.race
    character.alignment = createCharacterDto.alignment

    character.strength = createCharacterDto.abilities.strength
    character.dexterity = createCharacterDto.abilities.dexterity
    character.constitution = createCharacterDto.abilities.constitution
    character.intelligence = createCharacterDto.abilities.intelligence
    character.wisdom = createCharacterDto.abilities.wisdom
    character.charisma = createCharacterDto.abilities.charisma

    character.user = currentUser

    return await this.characterRepository.save(character)
  }

  async findOneById(characterId: number): Promise<CharacterEntity> {
    const character = await this.characterRepository.findOne({
      relations: { user: true },
      where: { id: characterId },
    })

    if (!character) {
      throw new HttpException('Character does not exist', HttpStatus.NOT_FOUND)
    }

    return character
  }

  async delete(
    characterId: number,
    currentUserId: number,
  ): Promise<CharacterEntity> {
    const character = await this.characterRepository.findOne({
      relations: { user: true },
      where: { id: characterId },
    })

    if (!character) {
      throw new HttpException('Character does not exist', HttpStatus.NOT_FOUND)
    }

    if (character.user.id !== currentUserId) {
      throw new HttpException('You are not an author', HttpStatus.FORBIDDEN)
    }

    await this.characterRepository.delete({ id: characterId })

    return character
  }

  buildCharacterListResponse(
    characters: CharacterEntity[],
  ): CharacterListResponseInterface[] {
    return characters.map((character: CharacterEntity) => ({
      id: character.id,
      name: character.name,
      class: character.class,
      race: character.race,
      alignment: character.alignment,
      createdAt: character.createdAt,
      updatedAt: character.updatedAt,
    }))
  }
}
