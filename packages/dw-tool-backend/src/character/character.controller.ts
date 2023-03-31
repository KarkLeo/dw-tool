import { Controller, Post } from '@nestjs/common';
import { CharacterService } from './character.service';

@Controller('characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}
  @Post()
  async create() {
    return 'Hello World!';
  }
}
