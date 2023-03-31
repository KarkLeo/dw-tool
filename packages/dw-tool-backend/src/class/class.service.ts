import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ClassEntity } from './class.entity'
import { Repository } from 'typeorm'

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(ClassEntity)
    private readonly classRepository: Repository<ClassEntity>,
  ) {}
  async getAllClasses(): Promise<ClassEntity[]> {
    return await this.classRepository.find()
  }
}
