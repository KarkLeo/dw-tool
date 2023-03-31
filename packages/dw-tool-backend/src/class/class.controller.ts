import { Controller, Get } from '@nestjs/common';
import { ClassService } from './class.service';

@Controller('classes')
export class ClassController {
  constructor(private readonly classService: ClassService) {}
  @Get()
  async getAllClasses(): Promise<{ classes: string[] }> {
    const classes = await this.classService.getAllClasses();

    return { classes: classes.map((i) => i.name) };
  }
}
